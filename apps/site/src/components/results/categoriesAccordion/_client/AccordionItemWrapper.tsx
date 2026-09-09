'use client'

import { captureEndClickCategory } from '@/constants/tracking/trackers'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { trackEvent } from '@/utils/analytics/trackEvent'

import type { ReactNode } from 'react'

interface Props {
  title: ReactNode
  name: string
  content: ReactNode
  ariaLabel?: string
  categoryDottedName: string
}

export default function AccordionItemWrapper({
  title,
  name,
  content,
  ariaLabel,
  categoryDottedName,
}: Props) {
  return (
    <AccordionItem
      title={title}
      name={name}
      content={content}
      ariaLabel={ariaLabel}
      tracker={(enhancer) => {
        const eventConfig = captureEndClickCategory({
          category: categoryDottedName,
        })

        const properties = enhancer({
          category: eventConfig.properties.category ?? '',
          action: eventConfig.properties.action ?? '',
        })

        trackEvent({
          eventName: eventConfig.eventName,
          properties,
        })
      }}
    />
  )
}
