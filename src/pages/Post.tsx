import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { SITE_NAME } from "../constants"
import { getAdjacentPosts, getPost } from "../lib/posts"
import CodeBlock from "../components/CodeBlock"

const LINK_CLASS =
  "text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"

function Post() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined
  const { older, newer } = slug ? getAdjacentPosts(slug) : {}

  useEffect(() => {
    document.title = post ? `${post.title} — ${SITE_NAME}` : SITE_NAME
  }, [post])

  if (!post) {
    return (
      <div className="flex flex-col items-start gap-4 mt-8">
        <p className="text-ink-muted">post not found</p>
        <Link to="/" className={LINK_CLASS}>
          back home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-4 mt-8 max-w-full">
      <Link to="/#blog" className={LINK_CLASS}>
        back to blog
      </Link>
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {post.title}
        </h1>
        <span className="text-sm text-ink-muted">{post.date}</span>
      </div>
      <article
        className="prose prose-sm sm:prose-base font-mono max-w-full
          [--tw-prose-body:var(--ink)] [--tw-prose-headings:var(--ink)]
          [--tw-prose-bold:var(--ink)] [--tw-prose-links:var(--accent)]
          [--tw-prose-quotes:var(--ink-muted)] [--tw-prose-quote-borders:var(--line)]
          [--tw-prose-hr:var(--line)] [--tw-prose-th-borders:var(--line)]
          [--tw-prose-td-borders:var(--line)] [--tw-prose-counters:var(--ink-muted)]
          [--tw-prose-bullets:var(--line)] [--tw-prose-code:var(--ink)]
          prose-headings:font-semibold
          prose-a:font-normal prose-a:underline prose-a:decoration-accent/40 prose-a:underline-offset-2
          hover:prose-a:decoration-accent
          prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
          prose-code:bg-paper-subtle prose-code:border prose-code:border-line
          prose-code:rounded prose-code:px-1 prose-code:py-0.5"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{ pre: CodeBlock }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      {(older || newer) && (
        <div className="flex w-full items-start justify-between gap-4 border-t border-line pt-4 text-sm">
          <div className="flex flex-col items-start">
            {older && (
              <>
                <span className="text-ink-muted">previous</span>
                <Link to={`/blog/${older.slug}`} className={LINK_CLASS}>
                  {older.title}
                </Link>
              </>
            )}
          </div>
          <div className="flex flex-col items-end text-right">
            {newer && (
              <>
                <span className="text-ink-muted">next</span>
                <Link to={`/blog/${newer.slug}`} className={LINK_CLASS}>
                  {newer.title}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Post
