import AccordionItem from './AccordionItem'

export type AccordionItemType = {
  title: string
  content: React.ReactNode
  icons: string
  className?: string
  category: string
  isReadOnly?: boolean
}

export default function Accordion({
  items,
  className = '',
}: {
  items: AccordionItemType[]
  className?: string
}) {
  return (
    <ul className={className}>
      {items.map(({ title, content, icons, category, isReadOnly }, index) => (
        <AccordionItem
          key={`${title}-${index}`}
          title={title}
          content={content}
          icons={icons}
          category={category}
          isReadOnly={isReadOnly}
        />
      ))}
    </ul>
  )
}
