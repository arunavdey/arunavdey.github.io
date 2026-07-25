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

`src/index.css` defines the palette as CSS custom properties (`--paper`, `--ink`, `--accent`, etc.), mapped into Tailwind's `@theme` so utilities like `bg-paper` / `text-ink` / `text-accent` exist. It's a single fixed "warm cup of coffee" theme — cream background, roasted-brown text, caramel accent — deliberately not tied to `prefers-color-scheme`; there's no dark variant, by design. (An earlier pass tried an inky near-black Flexoki-dark theme; it read as too dark and was replaced with this lighter, cream-based one.) The mono typeface is self-hosted (`@fontsource-variable/jetbrains-mono`) — no external font requests.

The header (`src/components/Header.tsx`) is a plain static block — title + Mastodon link. A scroll-collapsing/sticky version was tried and deliberately reverted (choppy, fought CSS in ways not worth the payoff); don't reintroduce that without being asked.
