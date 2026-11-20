import type { Metadata } from "next";
import Link from "next/link";
import { en } from "@/i18n/en";
import { vi } from "@/i18n/vi";
import { beVietnamPro } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `404 | ${vi.notFound.title}`,
  robots: { index: false },
};

/** Rendered outside any locale, so it speaks both languages. */
const NotFound = () => (
  <html lang="vi" className={beVietnamPro.variable}>
    <body className="grid min-h-dvh place-items-center bg-paper px-6 text-ink">
      <main className="max-w-xl">
        <p className="stamp text-5xl font-extrabold" aria-hidden="true">
          404
        </p>
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight">{vi.notFound.title}</h1>
        <p className="mt-2 text-xl text-graphite" lang="en">
          {en.notFound.title}
        </p>
        <ul className="mt-8 flex flex-wrap gap-6 font-semibold">
          <li>
            <Link className="action-secondary" href="/vi" hrefLang="vi" prefetch={false}>
              {vi.notFound.back}
            </Link>
          </li>
          <li>
            <Link className="action-secondary" href="/en" hrefLang="en" lang="en" prefetch={false}>
              {en.notFound.back}
            </Link>
          </li>
        </ul>
      </main>
    </body>
  </html>
);

export default NotFound;
