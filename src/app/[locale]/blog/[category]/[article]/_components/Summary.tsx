import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { twMerge } from 'tailwind-merge'

interface Heading {
  id: string
  text: string
  level: number
}

export default function Summary({ headings }: { headings: Heading[] }) {
  return (
    <div className="relative w-full rounded-xl bg-gray-100 p-4 before:absolute before:-left-8 before:top-0 before:h-full before:w-1 before:border-l before:border-gray-300 before:content-['']">
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
