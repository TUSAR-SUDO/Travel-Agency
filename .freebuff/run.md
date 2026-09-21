# Run doc — Travel Agency website (Vite + React dev server)

## How to reproduce the artifacts

Nothing special is needed beyond a normal checkout:

1. Dependencies: `npm install` (npm; lockfile is `package-lock.json`).
   - Current checkout already has `node_modules` — skip if present.
2. Static media: `public/images/home/*.jpg` (crops of `My/HOMEPAGE.png`,
   generated with a Pillow script) and `public/videos/*.mp4` (Pexels loops,
   downloaded) are committed in the workspace — no generation step required.
   If they ever go missing, re-crop from `My/HOMEPAGE.png` and re-download
   the loops (URLs recorded in git history of `src/data/packages.js`).
3. No `.env*` files exist; nothing to copy from the main checkout.

## How to run the server

- Command: `npm run dev` (Vite). Configured port: **3000** (`vite.config.js`).
- Detached (Windows), logging to this thread's log files:

  ```powershell
  powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
  ```

  (stdout and stderr must point at different files; `npm.cmd` must be named
  exactly — Start-Process does not resolve shell shims.)
- Verify: `curl http://localhost:3000/` → HTTP 200; confirm pid with
  `powershell -NoProfile -Command "Get-Process -Id <pid>"`.
- Register preview with url `http://localhost:3000` + the listening pid
  (the `npm.cmd` wrapper exits; the pid that owns port 3000 is the `node`
  process — find it via `netstat -ano | findstr :3000`).
- Production build (optional): `npm run build` → static `dist/` (Netlify/
  Vercel configs already present: `public/_redirects`, `vercel.json`).
