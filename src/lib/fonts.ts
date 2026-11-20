import { Be_Vietnam_Pro } from "next/font/google";

/** Self-hosted at build time by next/font: no request to a font CDN at runtime. */
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "600", "800"],
  display: "swap",
  variable: "--font-be-vietnam",
});
