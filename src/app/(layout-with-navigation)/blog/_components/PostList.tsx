'use client'

import PostListItem from '../_components/PostListItem'
import { blogData } from '../_data/articles'

export default function PostList() {
  return (
    <ul className="grid list-none grid-cols-1 justify-center gap-4 pl-0 sm:grid-cols-2">
      {blogData.map((post) => (
        <PostListItem post={post} key={post.slug} />
      ))}
    </ul>
  )
}
