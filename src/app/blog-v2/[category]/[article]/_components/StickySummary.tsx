import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { twMerge } from 'tailwind-merge'

interface Heading {
  id: string
  text: string
  level: number
}

export default async function StickySummary({
  headings,
}: {
  headings: Heading[]
}) {
  return (
    <div className="-order-1 w-full rounded-xl bg-gray-100 p-4 md:order-1 md:w-[calc(33%-8px)]">
      <h2 className="mb-2 text-xl font-bold">
        <Trans>Sommaire</Trans>
      </h2>

      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{
                paddingLeft:
                  heading.level === 2 ? '0' : `${(heading.level - 1) * 0.5}rem`,
              }}>
              <Link
                href={`#${heading.id}`}
                className={twMerge(
                  'hover:text-primary block text-sm text-default no-underline transition-colors duration-200',
                  'w-full truncate text-left'
                )}>
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
