import type { Section } from "./types"

export const SITE_NAME = "Arunav Dey"
export const COPYRIGHT_YEAR = 2026

export const MASTODON_LABEL = "Mastodon"
export const MASTODON_URL = "https://mastodon.social/@arunavdey"
export const MASTODON_LINK_COLOR = "#663399"

export const SECTION_ID = {
  ABOUT: "about",
  WORKSHOP: "workshop",
  BLOG: "blog",
} as const

export const SECTION_TITLE = {
  HELLO: "hello",
  WORKSHOP: "workshop",
  BLOG: "blog",
} as const

export const SECTION_DESCRIPTION = {
  BUILDING: "building the next big thing",
  UNDER_CONSTRUCTION: "under construction",
} as const

export const SECTIONS: Section[] = [
  {
    id: SECTION_ID.ABOUT,
    title: SECTION_TITLE.HELLO,
    description: SECTION_DESCRIPTION.BUILDING,
  },
  {
    id: SECTION_ID.WORKSHOP,
    title: SECTION_TITLE.WORKSHOP,
    description: SECTION_DESCRIPTION.UNDER_CONSTRUCTION,
  },
  {
    id: SECTION_ID.BLOG,
    title: SECTION_TITLE.BLOG,
    description: SECTION_DESCRIPTION.UNDER_CONSTRUCTION,
  },
]
