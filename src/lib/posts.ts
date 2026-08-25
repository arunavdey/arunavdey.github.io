import type { BlogPost } from "../types"

const rawPosts = import.meta.glob(["../posts/*.md", "!../posts/_*.md"], {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>

function parsePost(path: string, raw: string): BlogPost {
  const slug = path
    .replace(/^.*\//, "")
    .replace(/\.md$/, "")
    .replace(/^\d+-/, "")
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error(`Post "${slug}" is missing frontmatter`)
  }

  const frontmatter = match[1] ?? ""
  const content = match[2] ?? ""
  const fields = Object.fromEntries(
    frontmatter
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const index = line.indexOf(":")
        const key = line.slice(0, index).trim()
        const value = line.slice(index + 1).trim()
        return [key, value]
      }),
  )

  return {
    slug,
    title: fields.title ?? slug,
    date: fields.date ?? "",
    content: content.trim(),
  }
}

export const POSTS: readonly BlogPost[] = Object.entries(rawPosts)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug)
}

// POSTS is sorted newest-first, so the older post sits right after the
// current one and the newer post sits right before it.
export function getAdjacentPosts(slug: string): {
  older?: BlogPost
  newer?: BlogPost
} {
  const index = POSTS.findIndex((post) => post.slug === slug)
  if (index === -1) return {}
  return { older: POSTS[index + 1], newer: POSTS[index - 1] }
}
