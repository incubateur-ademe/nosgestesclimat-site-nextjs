'use client'

import Link from '@/components/Link'
import { useClientTranslation } from '@/hooks/useClientTranslation'

type LinkListProps = {
  entries: Record<string, { title: string; href: string }>
}

export default function LinkList({ entries }: LinkListProps) {
  const { t } = useClientTranslation()

  return (
    <ul className="m-0 list-none p-0">
      {Object.entries(entries).map(([linkKey, { title, href }]) => (
        <li key={linkKey}>
          <Link href={href}>{t(title)}</Link>
        </li>
      ))}
    </ul>
  )
}
