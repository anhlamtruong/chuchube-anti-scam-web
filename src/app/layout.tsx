import type { ReactNode } from "react";

/**
 * Pass-through root. Each locale renders its own <html lang> in
 * `app/[locale]/layout.tsx`; `app/not-found.tsx` renders its own document.
 */
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => children;

export default RootLayout;
