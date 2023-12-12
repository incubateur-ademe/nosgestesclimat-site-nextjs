import { Post } from '@/types/posts'
import Item from './list/Item'

type Props = {
  items: Post[]
  path: string
}
export default function PostList({ items, path }: Props) {
  return (
    <ul
      className="grid list-none grid-cols-1 justify-center gap-4 pl-0 sm:grid-cols-2"
      data-cypress-id="blog-list">
      {items
        .sort((itemA, itemB) =>
          new Date(itemA.data.date || '') > new Date(itemB.data.date || '')
            ? -1
            : 1
        )
        .map((item) => (
          <Item item={item} key={item.slug} path={path} />
        ))}
    </ul>
  )
}
