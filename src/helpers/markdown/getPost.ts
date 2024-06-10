import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export async function getPost(folderPath: string, slug: string) {
  const filePath = path.join(process.cwd(), folderPath + slug + '.mdx')
  try {
    const source = fs.readFileSync(filePath, 'utf-8')
    const matterResult = matter(source)

    return matterResult
  } catch (err) {
    return null
  }
}
