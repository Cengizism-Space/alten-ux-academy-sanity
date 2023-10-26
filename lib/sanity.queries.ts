import { groq } from 'next-sanity'

const cardFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  summary,
  coverImage,
  "slug": slug.current,
  "source": source->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "card"] | order(date desc, _updatedAt desc) {
  ${cardFields}
}`

export const cardAndMoreStoriesQuery = groq`
{
  "card": *[_type == "card" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${cardFields}
  },
  "moreCards": *[_type == "card" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${cardFields}
  }
}`

export const cardSlugsQuery = groq`
*[_type == "card" && defined(slug.current)][].slug.current
`

export const cardBySlugQuery = groq`
*[_type == "card" && slug.current == $slug][0] {
  ${cardFields}
}
`

export interface Source {
  name?: string
  picture?: any
}

export interface Card {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  summary?: string
  source?: Source
  slug?: string
  content?: any
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
