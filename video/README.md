# video/: HyperFrames sources for the site's looping clips

Video as code: each clip is an HTML composition rendered by [HyperFrames](https://github.com/heygen-com/hyperframes) (pinned to **`hyperframes@0.9.71`**), then encoded into `public/videos/`. Read `DESIGN.md` first: it holds the tokens, type and motion rules every clip follows.

```
video/
├── DESIGN.md                  shared design spec (tokens, type, motion, sizes)
├── README.md                  this file
├── .tools/                    npm helpers (gitignored): @fontsource/be-vietnam-pro, ffmpeg-static
└── check-flow/                the app's check flow, 800×1000, 8 s, 30 fps, seamless loop
    ├── index.html             the composition (one file; `lang` variable = vi | en)
    ├── assets/fonts/          Be Vietnam Pro 400/600/800, latin + vietnamese woff2, OFL.txt
    ├── hyperframes.json, meta.json, package.json   (from `init`; package.json pins the CLI)
    ├── renders/               delivery renders (gitignored)
    └── snapshots/             review stills (gitignored)
```

Outputs: `public/videos/check-flow-{vi,en}.{webm,mp4,webp}` (`.webp` is frame 0, the poster).

## The check-flow clip

Frame 0 is the finished result screen: the screenshot card for the suspicious page, **92%** with its label, the meter, three reasons, the official-channel row and the **Chuchube!** button. Then:

| time (s) | what happens |
| --- | --- |
| 0.30–0.62 | the button is pressed (scale 0.96 and back) |
| 0.55–1.12 | the red "Chuchube!" stamp lands on the screenshot (1.6× → 1×, −13° → −8°) and the card takes the hit |
| 1.00–1.50 | the button gives way to the dark toast "Đã chặn và báo cáo" / "Blocked and reported" |
| 2.60–3.30 | clean reset: stamp, toast, result and official row leave, and the screenshot card stays |
| 3.30–5.12 | two scan-line sweeps over the card and "Đang kiểm tra…" / "Checking…" |
| 5.00–6.55 | the percentage counts 0 → 92 with the meter, and the reasons arrive one by one |
| 6.60–7.45 | the official row, then the button, settle exactly into the frame-0 state |

Everything is drawn by one `renderAt(t)` driven by a single linear GSAP clock, so `renderAt(8) === renderAt(0)`. Copy for both languages lives in the `STRINGS` table in `check-flow/index.html`. All names are invented.

The language is a root-level HyperFrames variable (`lang`, default `vi`). Keep it in one standalone file: a sub-composition's script only sees its own scoped variables, so render-time `--variables` would not reach it.

## Requirements

- Node 22+, FFmpeg/FFprobe on PATH (`npx -y hyperframes@0.9.71 doctor` shows them; whisper/TTS/Docker are optional and not needed).
- Helpers, once: `npm i --prefix video/.tools @fontsource/be-vietnam-pro ffmpeg-static`
- The encode and loop-seam scripts come from the `living-ui-video` skill (living-ui-skills, MIT): `skills/living-ui-video/scripts/encode.mjs` and `loop-seam.mjs`. Point `LUV` at that folder:

  ```bash
  export LUV=/path/to/living-ui-skills/skills/living-ui-video/scripts
  ```

- **WebP poster needs libwebp.** Homebrew's FFmpeg 8 has no `libwebp` encoder, so `encode.mjs` fails on the poster. Use the npm `ffmpeg-static` binary (FFmpeg 6.0 with libx264, libvpx-vp9 and libwebp) for the encode step via `FFMPEG` (shown below).

## Check and look

```bash
cd video/check-flow
npx -y hyperframes@0.9.71 check --json                       # must report 0 errors
npx -y hyperframes@0.9.71 snapshot --at 0,0.8,1.6,2.8,3.9,5.6,6.8,7.99 --no-end -o snapshots/vi
```

`check` and `snapshot` don't take `--variables`, so check English on a throwaway copy with the default flipped (macOS `sed -i ''`; on Linux use `sed -i`):

```bash
T="$(mktemp -d)/check-flow-en" && mkdir -p "$T"
cp -R index.html assets hyperframes.json package.json "$T/"
sed -i '' 's/"default":"vi"/"default":"en"/' "$T/index.html"
(cd "$T" && npx -y hyperframes@0.9.71 check && npx -y hyperframes@0.9.71 snapshot --at 0,0.8,1.6,2.8,3.9,5.6,6.8,7.99 --no-end -o snapshots/en)
cp -R "$T/snapshots/en" snapshots/
```

Open the PNGs and look at frame 0 (the poster) and the Vietnamese diacritics. Accepted warnings:

- `composition_file_too_large` (lint). Splitting the file into sub-compositions would break the root-level `lang` variable (see above).
- `line_unread` (craft). The official row and button are on screen 7.0–8.0 s and then 0–2.7 s across the loop seam, so they are read for about 4 s in practice.

## Render, prove the loop, encode

```bash
cd video/check-flow
npx -y hyperframes@0.9.71 render -q delivery -w 6 --variables '{"lang":"vi"}' --strict-variables -o renders/check-flow-vi.mp4
npx -y hyperframes@0.9.71 render -q delivery -w 6 --variables '{"lang":"en"}' --strict-variables -o renders/check-flow-en.mp4

node "$LUV/loop-seam.mjs" renders/check-flow-vi.mp4             # must say "seamless"
node "$LUV/loop-seam.mjs" renders/check-flow-en.mp4

export FFMPEG="$(node -p "require('../.tools/node_modules/ffmpeg-static')")"
node "$LUV/encode.mjs" renders/check-flow-vi.mp4 check-flow-vi --out ../../public/videos --width 800
node "$LUV/encode.mjs" renders/check-flow-en.mp4 check-flow-en --out ../../public/videos --width 800

for f in ../../public/videos/check-flow-*; do ffprobe -v error -show_entries format=duration:stream=codec_type,codec_name,width,height -of compact=p=0 "$f"; done
```

Budgets: each MP4 ≤ 900 KB (hard cap 1.5 MB), and the WebM no larger than the MP4 (raise `--webm-crf` by 4 if it is). Bump the page's video cache-busting version after a re-render.

Last render (2026-11-19, CLI 0.9.71):

| file | bytes |
| --- | --- |
| `check-flow-vi.mp4` / `.webm` / `.webp` | 258,149 / 237,119 / 34,046 |
| `check-flow-en.mp4` / `.webm` / `.webp` | 250,863 / 230,002 / 32,764 |

Each is 800×1000, 30 fps, 8.000 s (240 frames), H.264 High / VP9, no audio stream. Loop seam: 0.04× (vi) and 0.03× (en) the biggest normal frame step.
