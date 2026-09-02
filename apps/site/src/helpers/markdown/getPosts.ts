import type { Locale } from '@/i18nConfig'
import type { Post } from '@/types/posts'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

// Kept as a literal so that the bundler's file tracing only follows this
// folder instead of the whole app.
const NOUVEAUTES_FOLDER = 'src/locales/nouveautes'

// Posts are .mdx files bundled with the deployment: they cannot change at
// runtime, so each locale is only read from disk once per server process.
const postsByLocale = new Map<Locale, Promise<Post[]>>()

export function getPosts(locale: Locale): Promise<Post[]> {
  const cached = postsByLocale.get(locale)
  if (cached) {
    return cached
  }

  const posts = readPosts(locale)
  postsByLocale.set(locale, posts)
  // Don't cache a transient failure (e.g. EMFILE) for the process lifetime.
  posts.catch(() => postsByLocale.delete(locale))
  return posts
}

async function readPosts(locale: Locale): Promise<Post[]> {
  const folderPath = path.join(process.cwd(), NOUVEAUTES_FOLDER, locale)
  const files = await fs.readdir(folderPath)
  return await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(folderPath, file), 'utf-8')
      const matterResult = matter(source)
      return {
        slug: file.replace('.mdx', ''),
        data: matterResult.data,
        content: matterResult.content,
      }
    })
  )
}
