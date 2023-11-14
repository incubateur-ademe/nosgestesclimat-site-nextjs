import Link from '@/components/Link'

type LinkListProps = {
  entries: Record<string, string>
}

export default function ({ entries }: LinkListProps) {
  return (
    <ul className="m-0 list-none p-0">
      {Object.entries(entries).map(([linkKey, linkUrl]) => (
        <li key={linkKey}>
          <Link href={linkUrl}>{linkUrl}</Link>
        </li>
      ))}
    </ul>
  )
}
