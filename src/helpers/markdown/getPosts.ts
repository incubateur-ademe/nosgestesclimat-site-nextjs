import { Post } from '@/types/posts'
import fs from 'fs'
import matter from 'gray-matter'

async function getPosts(folderPath: string): Promise<Post[]> {
  const files = fs.readdirSync(folderPath)
  return files.map((file) => {
    const source = fs.readFileSync(folderPath + file, 'utf-8')
    const matterResult = matter(source)
    return {
      slug: file.replace('.mdx', ''),
      data: matterResult.data,
      content: matterResult.content,
    }
  })
}

export default getPosts
