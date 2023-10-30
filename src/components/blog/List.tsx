import Item from './list/Item'

type Props = {
  items: {
    slug: string
    title: string
    date: string
  }[]
  path: string
}
export default function PostList({ items, path }: Props) {
  return (
    <ul className="grid list-none grid-cols-1 justify-center gap-4 pl-0 sm:grid-cols-2">
      {items.map((item) => (
        <Item item={item} key={item.slug} path={path} />
      ))}
    </ul>
  )
}
