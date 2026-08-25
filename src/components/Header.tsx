import { useState } from "react"
import { Link } from "react-router-dom"
import {
  SITE_NAME,
  MASTODON_LABEL,
  MASTODON_URL,
  GITHUB_LABEL,
  GITHUB_URL,
} from "../constants"
import { applyTheme, getStoredTheme, type Theme } from "../lib/theme"

const NAV_LINK_CLASS =
  "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"

function Header() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme())

  function toggleTheme() {
    const next: Theme = theme === "cyberpunk" ? "coffee" : "cyberpunk"
    setTheme(next)
    applyTheme(next)
  }

  return (
    <header className="flex w-full flex-col items-start gap-2 py-6 sm:py-8">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "cyberpunk" ? "Switch to light theme" : "Switch to dark theme"}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 cursor-pointer text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-full"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="8"
            fill={theme === "cyberpunk" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2.5"
            className="transition-[fill] duration-200"
          />
        </svg>
      </button>
      <Link to="/" className="no-underline">
        <h1 className="site-title text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
          {SITE_NAME}
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <a rel="me" href={MASTODON_URL} className={NAV_LINK_CLASS}>
          {MASTODON_LABEL}
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={NAV_LINK_CLASS}
        >
          {GITHUB_LABEL}
        </a>
      </div>
    </header>
  )
}

export default Header
