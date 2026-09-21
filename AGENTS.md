# Project memory — learned preferences (do not delete)

## Git workflow
- Never work directly on `dev` (the main line) or `master` (stale). Cut feature branches from latest `dev`.
- Never commit or push without an explicit user request (`push`, `commit`, `deploy`, `go` for a planned push). A "stop pushing / freeze" order stays active until explicitly lifted.
- Never rewrite pushed history (no rebase/amend after push, no force-push). Integrate via merge.
- Stage exact paths (`git add <paths>`); never blanket-add. `.kilo/` and `node_modules/` are always ignored.
- Concise commit messages matching repo style. PRs target `dev`; there is no `gh` CLI here — hand the user compare URLs instead.
- CI: `pr-verify.yml` (build check on PRs) and `react-gh-pages.yml` (deploy) both carry `cancel-in-progress` concurrency — keep it.
- Delete merged feature branches (local + remote) when asked to clean up.

## Files
- Never delete project content. Superseded/unused files move to `archive/` (e.g. `archive/unused-logos/`), never `rm`.
- Keep `public/` lean: unreferenced assets must not ship in `dist/`.
- `dist/` and `node_modules/` are git-ignored build artifacts.

## Planning & communication
- Plan first for anything beyond a trivial edit; present the plan, then implement on approval.
- Use question prompts for real decisions (scope, naming, strategy) instead of guessing twice.
- Implement the smallest diff that does the job: reuse existing classes/styles, zero new CSS when possible.
- Keep responses short and factual. No emojis unless requested.

## Performance (hard budget)
- Page must stay very fast: minimal requests, tiny bundles, no render-blocking chains.
- Verify with real commands and check exit codes directly (`> log 2>&1; echo $?`) — never trust `| tail` for pass/fail.
- Inline tiny SVGs (zero requests) instead of icon files; self-host assets rather than hotlinking.
- Fonts stay on Google CDN (`preconnect` + `display=swap`); no self-hosting, no new font families without approval.
- Analytics/listeners must be passive, delegated, idle-deferred; measurement never costs first paint.

## Content honesty (non-negotiable)
- Never invent metrics, shipped work, or familiarity. Keywords in skills lists are fine; specific achievement claims are not.
- Flag contradictions (e.g. site vs resume mismatch) plainly instead of silently complying.
- Privacy: no phone numbers, no real photo, no localStorage — theme follows OS every load, toggle lasts the session only.

## Voice & naming
- Level-free public wording: "Software Engineer", never Senior/Lead in titles, meta, or intro. (The factual "Lead Software Engineer" role title stays — background checks verify titles.)
- Name: "Sainath" in tab/share titles, "Sainath R" on the page itself.
- Title pattern: short skill-led headline (current: "Sainath | Backend & Data").
- PDF filenames: `Sainath_Resume_GH<YYYYMMDDHHMMSS>` — no spaces, GH tag included.
- Design voice: monospace dev aesthetic, restrained emoji, space-efficient, no decoration for its own sake.

## Stack decisions (settled — do not reopen unprompted)
- Vite 8 + React 19 SPA, JavaScript (no TypeScript migration).
- No Tailwind (declined — custom CSS with variables is the system).
- Prerender/SSG: APPROVED after LCP field data demanded it — build renders `src/prerender-entry.jsx` via `tools/snapshot.mjs` into `dist/index.html` (`postbuild` copies it to `404.html`); client uses `hydrateRoot`, theme toggle carries `suppressHydrationWarning`. Never add `node:fs`-heavy scripts under `scripts/` (write-filter); `tools/` works.
- Dark mode via `data-theme` + OS default; print always forces a clean light resume.
- All motion must be GPU-only keyframes/transitions with `prefers-reduced-motion` guards and print final states.
- Analytics: custom events centralized in `src/lib/events.js` (`section_view`, `scroll_depth`, `print_resume_click`, `print_completed`, `contact_click`, `contact_copy`, `outbound_click`, `engaged_time`, `theme_toggle`, `palette_open`, `palette_action`); Cloudflare is pageviews-only backup.
- Filenames must be adblock-safe: never `analytics.js` or other EasyPrivacy-matching names (use `events.js` style neutrals).
- Icon sourcing (all icons inlined in `src/components/TechIcon.jsx`, zero requests): FontAwesome Free marks from `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@<major>/svgs/solid/<name>.svg`; brand marks from the `simple-icons` CDN; line icons from `lucide-static`. FA Free is CC BY 4.0 — keep the attribution header in TechIcon.jsx and the packages in devDependencies as the source record.

## Parked threads (blocked on user content, do not invent)
- Clickable proof: project GitHub/demo URLs for Selected systems cards (`project.links` support already coded).
- Testimonials: 2–3 quotes (`testimonials: []` renders nothing until filled).
- Work authorization + remote preference (JSON fields exist, empty).
- PageSpeed before/after receipt for the migration (live site is the old baseline until merged work deploys).
