"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { queueWarmUp } from "./warm-up";
import "./video.css";

/** Bump when the clips are re-rendered: the files are served with a long cache. */
export const VIDEO_VERSION = "1";

type LoopVideoProps = {
  /** File name without extension: /videos/<name>.{webm,mp4,webp} */
  name: string;
  /** What the clip shows; it is the video's accessible name. */
  label: string;
  pauseLabel: string;
  playLabel: string;
  /** Intrinsic render size, so the slot has its aspect ratio before the poster loads. */
  width: number;
  height: number;
  className?: string;
};

/**
 * A muted loop that never slows the page: the poster paints with the HTML,
 * the clip warms up once the page is idle, and it plays only while on screen.
 * Under prefers-reduced-motion it never plays: the poster (frame 0) carries it.
 */
export const LoopVideo = ({ name, label, pauseLabel, playLabel, width, height, className = "" }: LoopVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    // React does not always write `muted` into the server HTML; autoplay needs it.
    video.muted = true;
    video.defaultMuted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !pausedByUser.current) {
          if (video.preload === "none") video.preload = "auto";
          video.play().catch(() => {
            // Autoplay can be refused (e.g. iOS Low Power Mode): the poster stays up.
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(video);
    const leaveQueue = queueWarmUp(video);

    return () => {
      observer.disconnect();
      leaveQueue();
      video.pause();
    };
  }, [reducedMotion]);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    pausedByUser.current = !pausedByUser.current;
    setPaused(pausedByUser.current);
    if (pausedByUser.current) video.pause();
    else video.play().catch(() => {});
  };

  const src = `/videos/${name}`;

  return (
    <div className={`lv-video ${className}`}>
      <video
        ref={videoRef}
        className="lv-video__media"
        width={width}
        height={height}
        poster={`${src}.webp?v=${VIDEO_VERSION}`}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
      >
        <source src={`${src}.webm?v=${VIDEO_VERSION}`} type="video/webm" />
        <source src={`${src}.mp4?v=${VIDEO_VERSION}`} type="video/mp4" />
      </video>
      {reducedMotion ? null : (
        <button
          type="button"
          className="lv-video__toggle"
          onClick={handleToggle}
          aria-pressed={paused}
          aria-label={paused ? playLabel : pauseLabel}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            {paused ? (
              <path d="M5 3.2v9.6L12.8 8z" fill="currentColor" />
            ) : (
              <path d="M4.5 3h2.6v10H4.5zM8.9 3h2.6v10H8.9z" fill="currentColor" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
};
