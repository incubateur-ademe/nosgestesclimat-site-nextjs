import ChevronRight from '@/design-system/icons/ChevronRight'
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
  isReadOnly?: boolean
}

export default function AccordionItem({
  category,
  title,
  icons,
  content,
  isReadOnly,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { numericValue } = useRule(category)

  return (
    <li>
      <button
        onClick={() => !isReadOnly && setIsOpen((prevState) => !prevState)}
        className={`border-grey-300 flex w-full items-center justify-between px-2 py-4 ${
          isOpen ? '' : 'border-b'
        }`}
        aria-disabled={isReadOnly}>
        <div className="flex items-center gap-4">
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

          <ChevronRight
            className={`${isOpen ? 'rotate-90' : ''} ${
              isReadOnly ? 'opacity-20' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div>
          <Card
            className="mb-4 border-x-0 bg-grey-100"
            style={{
              boxShadow: '0px 6px 6px -2px rgba(21, 3, 35, 0.05) inset',
            }}>
            {content}
          </Card>
        </div>
      )}
    </li>
  )
}
