import { Post } from '@/types/posts'
import { twMerge } from 'tailwind-merge'
import Item from './list/Item'

type Props = {
  items: Post[]
  path: string
  className?: string
}
export default function PostList({ items, path, className }: Props) {
  return (
    <ul
      className={twMerge(
        'grid list-none grid-cols-1 justify-center gap-4 pl-0 sm:grid-cols-2',
        className
      )}
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
