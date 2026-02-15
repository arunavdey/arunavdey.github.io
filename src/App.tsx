import { useEffect } from "react"
import {
  SITE_NAME,
  COPYRIGHT_YEAR,
  MASTODON_LABEL,
  MASTODON_URL,
  MASTODON_LINK_COLOR,
  SECTIONS,
} from "./constants"

function App() {
  useEffect(() => {
    document.title = SITE_NAME
  }, [])

  return (
    <div className="font-mono box-content flex flex-col items-center p-16 m-0 max-w-full">
      <div className="flex flex-col items-start">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-4xl font-bold">{SITE_NAME}</h1>
          <a
            rel="me"
            href={MASTODON_URL}
            className="underline"
            style={{ color: MASTODON_LINK_COLOR }}
          >
            {MASTODON_LABEL}
          </a>
        </div>
        <div className="flex flex-col items-start gap-6 mt-6">
          {SECTIONS.map(({ id, title, description }) => (
            <section
              key={id}
              id={id}
              className="flex flex-col items-start gap-1"
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p>{description}</p>
            </section>
          ))}
        </div>
        <div className="mt-8">
          <p className="copyright text-sm">
            &copy; {COPYRIGHT_YEAR} {SITE_NAME}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
