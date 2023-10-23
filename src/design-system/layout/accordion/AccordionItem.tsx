import ChevronRight from '@/app/(layout-with-navigation)/(simulation)/amis/_components/ChevronRight'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { formatValue } from 'publicodes'
import { useState } from 'react'
import Card from '../Card'

type Props = {
  title: string
  content: React.ReactNode
  icons: string
  category: string
}

export default function AccordionItem({
  category,
  title,
  icons,
  content,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { numericValue } = useRule(category)

  return (
    <li>
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="border-grey-300 flex w-full items-center justify-between border-b px-2 py-4">
        <div className="flex items-center gap-2">
          <Emoji>{icons}</Emoji>
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-4 text-primaryDark">
          <span>
            <strong>
              {formatValue(numericValue / 1000, { precision: 1 })}
            </strong>{' '}
            tonnes
          </span>
          <ChevronRight className={isOpen ? 'rotate-90' : ''} />
        </div>
      </button>

      {isOpen && (
        <Card
          className="rounded-none border-x-0 bg-grey-100"
          style={{ boxShadow: '0px 6px 6px -2px rgba(21, 3, 35, 0.05) inset' }}>
          {content}
        </Card>
      )}
    </li>
  )
}
