# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is Bun (see `bun.lock`; CI also uses `oven-sh/setup-bun`).

- `bun install` — install dependencies
- `bun run dev` — start the Vite dev server
- `bun run build` — typecheck (`tsc -b`) then production build to `dist/`
- `bun run preview` — serve the built `dist/` locally

There are no lint or test scripts configured in this repo.

## Architecture

Vite + React 19 + TypeScript + Tailwind v4 static site, deployed to GitHub Pages at the custom domain `arunavdey.com` (`public/CNAME`) via `.github/workflows/deploy.yml` on every push to `main`.

### Blog: markdown files as the content store

There is no CMS or backend. Blog posts are markdown files in `src/posts/*.md` with a minimal frontmatter block (`title`, `date`):

- `src/lib/posts.ts` loads every post at build time via `import.meta.glob(["../posts/*.md", "!../posts/_*.md"], { eager: true, query: "?raw" })`, parses frontmatter with a small hand-rolled parser (not gray-matter/YAML — frontmatter is just flat `key: value` lines), and exports `POSTS` pre-sorted newest-first.
- Files prefixed with `_` (e.g. `src/posts/_template.md`) are excluded from the glob by convention — that's the scaffold for starting a new post, and is never routable.
- `getAdjacentPosts(slug)` derives prev/next navigation directly from `POSTS` array order (no separate index needed).
- Post rendering (`src/pages/Post.tsx`) uses `react-markdown` + `remark-gfm` + `rehype-highlight`. Code blocks go through a custom `pre` override (`src/components/CodeBlock.tsx`) that reads the `language-xxx` class `rehype-highlight` puts on the `<code>` element and renders it as a label above the code box; `.hljs` in `src/index.css` only carries token colors, the box chrome (border/bg/padding) lives on `CodeBlock`'s wrapper.

### Client-side routing on GitHub Pages

Routing is `react-router-dom` (`BrowserRouter`), but GitHub Pages has no server-side rewrites, so a direct hit or refresh on `/blog/:slug` would 404. `public/404.html` + a small inline script in `index.html` implement the standard SPA-on-GitHub-Pages redirect trick (stash the path in a query param, restore it via `history.replaceState` before the router mounts).

### Design tokens

`src/index.css` defines the palette as CSS custom properties (`--paper`, `--ink`, `--accent`, etc.) with a `prefers-color-scheme: dark` override block, then maps them into Tailwind's `@theme` so utilities like `bg-paper` / `text-ink` / `text-accent` exist. The mono typeface is self-hosted (`@fontsource-variable/jetbrains-mono`) — no external font requests.

### Sticky header (`src/components/Header.tsx`)

The header shrinks and its layout flips (title+link stacked → title+link side by side) once the page scrolls past a threshold. Two non-obvious constraints keep this working — easy to silently break when touching this component or its ancestors in `App.tsx`:

- **No `overflow-x: hidden` on any ancestor of the header.** Per the CSS overflow spec, setting only one axis to non-`visible` forces the other axis to compute to `auto`, silently turning that ancestor into its own scroll container — which breaks `position: sticky` for descendants (their containing scrollport becomes that ancestor instead of the viewport). Horizontal clipping lives only on `html` in `src/index.css`, which is safe because `html` is already the document's actual scroll root, not a nested one.
- **The sticky containing block must span the full page height.** `position: sticky` can only stay pinned while its containing block still overlaps the viewport. The `relative` anchor for the header's absolutely-positioned scroll sentinel lives on the page-level wrapper in `App.tsx` (which spans the whole page), not on a small div wrapping just the header.
- Collapse/expand state is driven by an `IntersectionObserver` on that sentinel (fixed position, zero layout footprint) rather than a raw `scroll` listener comparing `window.scrollY` — a listener that also changes the header's own height on every tick can retrigger itself and flicker.
