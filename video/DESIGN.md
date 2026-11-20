# Chuchube videos: shared design spec

Every video on the Chuchube site is a HyperFrames project in this folder, rendered to MP4 and encoded into `public/videos/`. They play muted, looping and inline inside the site's own design, so they must look like part of the page, not like ads dropped onto it.

## Look

Taken from the site's design tokens.

- Ground (paper) `#f7f6f2`. Sheets (cards) `#ffffff`. Hairlines `rgba(22,22,26,0.12)`, 1 px.
- Text (ink) `#16161a`, muted `#5d5d66` (6.5:1 on white, so it is safe at any size).
- Accent, signal red `#e5482d`: the stamp, the "Chuchube!" button, the danger meter, the big percentage. It is 4.4:1 on paper, so only use it for text 24 px or larger.
- Small red text and warning glyphs `#c0391f` (5:1 on paper).
- Verified green `#1d7a55`: the official-channel check and tag (5.3:1 on white).
- Corners: 18 px on cards, 999 px on pills. No shadows, no gradients except the scan-line glow.
- Feel in one line: a calm, flat app UI on paper. Not a phone mockup, not a screen recording, no brand chrome.

## Type

Be Vietnam Pro only (SIL OFL 1.1), weights 400, 600 and 800, latin + vietnamese subsets. The files come from `@fontsource/be-vietnam-pro` (installed into `video/.tools/`) and are copied into each project's `assets/fonts/` with `OFL.txt`:

```css
@font-face { font-family: "Be Vietnam Pro"; font-weight: 400; src: url("assets/fonts/be-vietnam-pro-vietnamese-400-normal.woff2") format("woff2"); unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
@font-face { font-family: "Be Vietnam Pro"; font-weight: 400; src: url("assets/fonts/be-vietnam-pro-latin-400-normal.woff2") format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
/* same pair again for 600 and 800 */
```

Both subsets are needed: `ơ ư ă đ` and the stacked tone marks (`ế ủ ầ ổ ặ`) live in the vietnamese file, while `â ê ô à á ã` live in latin. Check diacritics in a snapshot every time the copy changes.

- Big number: 800, at least 140 px (the check flow uses 150 px), `letter-spacing: -0.04em`, tabular figures.
- Names and buttons: 800, 30 to 40 px. Labels: 600, at least 28 px. Body: 400, at least 30 px.
- Icons are inline SVG shapes, not font glyphs (the font has no warning or check symbols).

## Motion rules

- **Seamless loop.** The frame after the last frame is frame 0. Draw every frame from time with one `renderAt(t)` driven by a single linear clock tween, so `renderAt(8) === renderAt(0)` by construction. Verify with `loop-seam.mjs`.
- **Frame 0 is the poster.** It must look complete, so start mid-action. In the check flow, frame 0 is the finished result screen, just before the button is pressed.
- **Eases:** cubic-out for arrivals, quad-in for exits, sine-in-out for travel (the scan line). No elastic, bounce, spin or overshoot.
- **One to three focal motions at a time.** Transform and opacity only, plus text for counters.
- **Deterministic only:** no `Math.random`, no `Date.now`, no timers, no `repeat: -1`, no network beyond the pinned GSAP script.

## Banned

- Any real person, celebrity, brand, business or platform name, logo or UI chrome. All names are invented (for example "Bếp của Mơ").
- Phone frames and device mockups. Cursor sprites, since the page has its own. Sound.
- Outer borders, rounded canvas corners or drop shadows at the canvas edge, because the page draws the frame.

## Sizes and outputs

| name | canvas | length | plays on page (approx. width) | scale | budget (mp4) |
| --- | --- | --- | --- | --- | --- |
| `check-flow-vi`, `check-flow-en` | 800×1000 (4:5) | 8 s | ~440 px desktop, ~340 px phone | 0.55 / 0.43 | ≤ 900 KB (hard cap 1.5 MB) |

- The page draws a "Minh hoạ" / "Illustration" chip over the top-left: keep about 240×90 px there free of content. It draws a pause button bottom-right: keep about 220×110 px there free.
- All at 30 fps, no audio track. WebM must not be larger than the MP4.

## Work loop

See `video/README.md` for the exact commands, the pinned CLI version and the FFmpeg note.
