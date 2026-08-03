import { Accordion as AccordionPrimitive } from 'radix-ui'
import type { ReactElement } from 'react'
import type { AccordionItemType } from './accordion/AccordionItem'

export default function Accordion({
  className = '',
  children,
}: {
  children?: ReactElement<AccordionItemType> | ReactElement<AccordionItemType>[]
  className?: string
}) {
  return (
    <AccordionPrimitive.Root
      type="multiple"
      className={className}
      // Each item keeps its own open state, as in the legacy behaviour
      defaultValue={[]}>
      {children}
    </AccordionPrimitive.Root>
  )
}
