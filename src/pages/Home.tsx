import { Link } from "react-router-dom"
import { SECTIONS, SECTION_ID, SECTION_TITLE } from "../constants"
import { POSTS } from "../lib/posts"

function Home() {
  return (
    <div className="flex flex-col items-start gap-8 mt-8">
      {SECTIONS.map(({ id, title, description }) => (
        <section key={id} id={id} className="flex flex-col items-start gap-1">
          <h2 className="text-lg font-medium text-ink">{title}</h2>
          <p className="text-ink-muted">{description}</p>
        </section>
      ))}
      <section id={SECTION_ID.BLOG} className="flex flex-col items-start gap-2">
        <h2 className="text-lg font-medium text-ink">{SECTION_TITLE.BLOG}</h2>
        {POSTS.length === 0 ? (
          <p className="text-ink-muted">under construction</p>
        ) : (
          <ul className="flex flex-col items-start gap-1.5">
            {POSTS.map((post) => (
              <li key={post.slug} className="flex items-baseline gap-3">
                <span className="text-sm text-ink-muted">{post.date}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Home
