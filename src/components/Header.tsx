import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { SITE_NAME, MASTODON_LABEL, MASTODON_URL } from "../constants"

// How far the page has to scroll before the header collapses.
const SCROLL_THRESHOLD_PX = 24

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    // The sentinel sits at a fixed spot at the very top of the page
    // (position: absolute, no layout footprint), so its intersection
    // with the viewport can't be disturbed by the header resizing itself
    // below it — that self-feedback loop was what caused the flicker.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setScrolled(!entry.isIntersecting)
      },
      { threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={sentinelRef}
        className="pointer-events-none absolute top-0 left-0 w-full"
        style={{ height: SCROLL_THRESHOLD_PX }}
        aria-hidden
      />
      <header className="sticky top-0 z-10 w-full bg-paper/95 backdrop-blur-sm">
        <div
          className={`flex transition-[padding,gap] duration-200 ease-in-out ${
            scrolled
              ? "flex-row items-center justify-between gap-4 py-3"
              : "flex-col items-start gap-2 py-6 sm:py-8"
          }`}
        >
          <Link to="/" className="no-underline">
            <h1
              className={`font-semibold tracking-tight text-ink transition-[font-size] duration-200 ease-in-out ${
                scrolled ? "text-lg" : "text-3xl sm:text-4xl"
              }`}
            >
              {SITE_NAME}
            </h1>
          </Link>
          <a
            rel="me"
            href={MASTODON_URL}
            className={`text-accent underline decoration-accent/40 underline-offset-2 transition-[font-size,text-decoration-color] duration-200 ease-in-out hover:decoration-accent ${
              scrolled ? "text-sm" : "text-base"
            }`}
          >
            {MASTODON_LABEL}
          </a>
        </div>
        <div
          className={`border-b border-line transition-opacity duration-200 ease-in-out ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>
    </>
  )
}

export default Header
