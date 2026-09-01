import type { Locale } from '@/i18nConfig'
import type { Post } from '@/types/posts'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

// Kept as a literal so that the bundler's file tracing only follows this
// folder instead of the whole app.
const NOUVEAUTES_FOLDER = 'src/locales/nouveautes'

export function getPost(locale: Locale, slug: string): Post | null {
  const filePath = path.join(
    process.cwd(),
    NOUVEAUTES_FOLDER,
    locale,
    `${slug}.mdx`
  )
  try {
    const source = fs.readFileSync(filePath, 'utf-8')
    const matterResult = matter(source)

    return matterResult
  } catch {
    return null
  }
}
