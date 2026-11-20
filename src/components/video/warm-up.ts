// Idle warm-up for looping clips (living-ui-video method): once the page has
// loaded and gone idle, fetch clips one at a time in page order, so the first
// one you scroll to is ready first. Skipped on Save-Data and 2G connections.

const queue = new Set<HTMLVideoElement>();
let warming = false;

const readConnection = (): { saveData: boolean; effectiveType: string } => {
  const connection: unknown = Reflect.get(navigator, "connection");
  if (typeof connection !== "object" || connection === null) return { saveData: false, effectiveType: "" };
  const saveData: unknown = Reflect.get(connection, "saveData");
  const effectiveType: unknown = Reflect.get(connection, "effectiveType");
  return {
    saveData: saveData === true,
    effectiveType: typeof effectiveType === "string" ? effectiveType : "",
  };
};

const canWarmUp = (): boolean => {
  const { saveData, effectiveType } = readConnection();
  return !saveData && effectiveType !== "2g" && effectiveType !== "slow-2g";
};

const whenIdle = (callback: () => void): void => {
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(callback, { timeout: 3000 });
  else window.setTimeout(callback, 1200);
};

const byPageOrder = (a: HTMLVideoElement, b: HTMLVideoElement): number =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

const warmNext = (): void => {
  const [next] = [...queue]
    .filter((video) => video.isConnected && video.readyState === 0 && video.preload === "none")
    .sort(byPageOrder);
  if (!next) {
    warming = false;
    return;
  }
  let settled = false;
  const settle = () => {
    if (settled) return;
    settled = true;
    next.removeEventListener("loadeddata", settle);
    next.removeEventListener("error", settle);
    whenIdle(warmNext);
  };
  next.addEventListener("loadeddata", settle);
  next.addEventListener("error", settle);
  window.setTimeout(settle, 6000); // a stalled request must not block the queue
  next.preload = "auto";
  next.load();
};

const startWarmUp = (): void => {
  if (warming || !canWarmUp()) return;
  warming = true;
  const begin = () => whenIdle(warmNext);
  if (document.readyState === "complete") begin();
  else window.addEventListener("load", begin, { once: true });
};

/** Adds a clip to the warm-up queue; returns a disposer that removes it. */
export const queueWarmUp = (video: HTMLVideoElement): (() => void) => {
  queue.add(video);
  startWarmUp();
  return () => {
    queue.delete(video);
  };
};
