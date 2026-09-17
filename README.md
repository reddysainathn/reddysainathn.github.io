# Sainath's Portfolio — reddysainathn.github.io

Personal portfolio site, built with React 19 + Vite and deployed to GitHub Pages.

## Develop

- `npm install`
- `npm run dev` — local dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build

## Deploy

Pushes to `dev` trigger `.github/workflows/react-gh-pages.yml`, which builds `dist/` and publishes it to the `gh-pages` branch.
