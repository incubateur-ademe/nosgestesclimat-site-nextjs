'use client'

import ChevronRight from '@/components/icons/ChevronRight'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Accordion as AccordionPrimitive } from 'radix-ui'

import type { ReactNode } from 'react'
import { useId, useState } from 'react'

export interface AccordionItemType {
  title: ReactNode
  name: string
  content: ReactNode
  className?: string
  isReadOnly?: boolean
  onClick?: () => void
  ariaLabel?: string
  tracker?: (
    enhancer: (props?: Record<string, string>) => Record<string, string>
  ) => void
}

export default function AccordionItem({
  title,
  name,
  content,
  isReadOnly = false,
  onClick,
  ariaLabel,
  tracker,
}: AccordionItemType) {
  const { t } = useClientTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const buttonId = useId()
  const panelId = useId()

  const handleClick = () => {
    if (isReadOnly) return

    const willOpen = !isOpen
    setIsOpen(willOpen)

    tracker?.((props) => ({
      ...props,
      action: willOpen ? 'open' : 'close',
    }))

    if (onClick) {
      onClick()
    }
  }

  return (
    <AccordionPrimitive.Item
      value={name}
      disabled={isReadOnly}
      className="max-w-full list-none">
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          id={buttonId}
          data-ph-capture-attribute-action={isReadOnly ? undefined : isOpen ? 'Fermer' : 'Ouvrir'}
          data-ph-capture-attribute-label={ariaLabel ?? name}
          aria-label={ariaLabel ?? name}
          title={`${ariaLabel ?? name} - ${isOpen ? t('Fermer') : t('Ouvrir')}`}
          onClick={handleClick}
          className={`group focus-visible:ring-primary-700 relative z-10 mb-1 flex w-full max-w-full items-end justify-between focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1 ${isReadOnly ? 'cursor-default!' : ''}`}
          aria-controls={panelId}>
          <div className="flex max-w-full flex-1 items-center gap-4">
            {title}
          </div>

          <div className="absolute top-1/2 right-6 flex -translate-y-1/2 items-center">
            <ChevronRight
              className={`h-4 w-4 stroke-slate-950 rotate-90 group-aria-expanded:-rotate-90 ${
                isReadOnly ? 'opacity-20' : ''
              }`}
            />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="animate-fade-in-slide-from-top z-0 motion-reduce:translate-y-0 motion-reduce:animate-none motion-reduce:opacity-100">
        {content}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}
