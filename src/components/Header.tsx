import { Link } from "react-router-dom"
import {
  SITE_NAME,
  MASTODON_LABEL,
  MASTODON_URL,
  GITHUB_LABEL,
  GITHUB_URL,
} from "../constants"

function Header() {
  return (
    <header className="flex w-full flex-col items-start gap-2 py-6 sm:py-8">
      <Link to="/" className="no-underline">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
          {SITE_NAME}
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <a
          rel="me"
          href={MASTODON_URL}
          className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
        >
          {MASTODON_LABEL}
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
        >
          {GITHUB_LABEL}
        </a>
      </div>
    </header>
  )
}

export default Header
