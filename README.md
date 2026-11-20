# Chuchube — public website

The public marketing site for **Chuchube** (chuchube.co), a Vietnamese app against accounts that
impersonate public figures and businesses. Rallying cry: **"Chuchube!"** — you spotted a fake, block
and report it right away.

## Stack

- Next.js 15 (App Router), React 19, TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS 4
- Be Vietnam Pro, self-hosted through `next/font` (`vietnamese` + `latin` subsets)
- One looping on-page video authored as HTML with HyperFrames (`video/`)

## Routes

| Route      | What it serves                                                                  |
| ---------- | ------------------------------------------------------------------------------- |
| `/`        | 307 redirect to `/vi` or `/en` by `Accept-Language` (middleware, no JS needed)  |
| `/vi`      | Vietnamese page, statically generated                                           |
| `/en`      | English page, statically generated                                              |
| `/robots.txt`, `/sitemap.xml` | Generated from `src/app/robots.ts` and `src/app/sitemap.ts`  |

## Principles

- Every word is in the server-rendered HTML. The page is fully readable with JavaScript disabled.
- Motion is progressive enhancement only, animates `transform`/`opacity`, and turns off under
  `prefers-reduced-motion: reduce`.
- No forms, no analytics, no third-party scripts, fonts or CDNs. Contact is a `mailto:` link.
- Illustrations use invented names and letter avatars, each labelled "Minh hoạ" / "Illustration".
  Never name or show a real person or real company.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build && npm run start
```

Copy lives in typed dictionaries: `src/i18n/vi.ts` and `src/i18n/en.ts`. The type system rejects a
dictionary whose keys differ from the other.

## Motion

Motion follows the owner's living-ui method: content first, then a static page, then small layers.

- **Stamp** (`src/app/globals.css`): the headline's "Chuchube!" stamp presses down on load, then
  the fake page in the illustration gets stamped. CSS transform only; off under reduced motion.
- **Light effects** (`src/components/fx/`, adapted from living-ui-effects, MIT): hologram tilt on
  the verified sheet, a glitch on the fake page's name, scramble on link labels. Pointer effects only
  run on fine pointers; nothing runs under reduced motion.
- **Video** (`src/components/video/`): poster first, idle warm-up, plays only on screen, never under
  reduced motion.

## Video

The loop in "How it works" is a HyperFrames project in `video/`. See `video/README.md` to re-render
it; the encoded files live in `public/videos/`. `video/` is listed in `.vercelignore`.

## Docs

- `docs/taglines.md`: alternative tagline options in both languages for the owner to choose from.
