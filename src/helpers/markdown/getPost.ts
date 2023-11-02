import fs from 'fs'
import matter from 'gray-matter'

async function getPost(folderPath: string, slug: string) {
  const source = fs.readFileSync(folderPath + slug + '.mdx', 'utf-8')
  const matterResult = matter(source)
  return matterResult.content
}

export default getPost
