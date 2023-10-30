import { ReactElement } from 'react'
import { AccordionItemType } from './accordion/AccordionItem'

export default function Accordion({
  className = '',
  children,
}: {
  children?: ReactElement<AccordionItemType> | ReactElement<AccordionItemType>[]
  className?: string
}) {
  return <ul className={className}>{children}</ul>
}
