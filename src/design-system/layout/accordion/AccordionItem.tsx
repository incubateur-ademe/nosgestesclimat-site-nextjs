import ChevronRight from '@/components/icons/ChevronRight'
import { motion } from 'framer-motion'
import type { ReactNode} from 'react';
import { useState } from 'react'

export type AccordionItemType = {
  title: ReactNode
  content: ReactNode
  className?: string
  isReadOnly?: boolean
  onClick?: () => void
}

export default function AccordionItem({
  title,
  content,
  isReadOnly = false,
  onClick,
}: AccordionItemType) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li>
      <button
        onClick={() => {
          if (!isReadOnly) {
            setIsOpen((prevState) => !prevState)
          }
          if (onClick) {
            onClick()
          }
        }}
        className={`relative z-10 flex w-full items-end justify-between py-2 ${isReadOnly ? '!cursor-default' : ''}`}
        aria-disabled={isReadOnly}>
        <div className="flex flex-1 items-center gap-4">{title}</div>

        <div className="flex items-center gap-4">
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
          {content}
        </motion.div>
      )}
    </li>
  )
}
