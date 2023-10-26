import ChevronRight from '@/design-system/icons/ChevronRight'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { formatValue } from 'publicodes'
import { useState } from 'react'
import Card from '../Card'

export type AccordionItemType = {
  title: string
  content: React.ReactNode
  icons: string
  className?: string
  dottedName: string
  isReadOnly?: boolean
}

export default function AccordionItem({
  dottedName,
  title,
  icons,
  content,
  isReadOnly,
}: AccordionItemType) {
  const [isOpen, setIsOpen] = useState(false)

  const { numericValue } = useRule(dottedName)

  return (
    <li>
      <button
        onClick={() => !isReadOnly && setIsOpen((prevState) => !prevState)}
        className={`border-grey-300 relative z-10 flex w-full items-center justify-between bg-white px-2 py-4 ${
          isOpen ? '' : 'border-b'
        } ${isReadOnly ? '!cursor-default' : ''}`}
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
        <motion.div
          initial={{ opacity: 0.6, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-0">
          <Card
            className="mb-4 border-x-0 bg-grey-100"
            style={{
              boxShadow: '0px 6px 6px -2px rgba(21, 3, 35, 0.05) inset',
            }}>
            {content}
          </Card>
        </motion.div>
      )}
    </li>
  )
}
