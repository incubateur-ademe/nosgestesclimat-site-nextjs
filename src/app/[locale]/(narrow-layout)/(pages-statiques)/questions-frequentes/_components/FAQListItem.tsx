'use client'

import Card from '@/design-system/layout/Card'
import Markdown from '@/design-system/utils/Markdown'

export default function FAQListItem({
  id,
  question,
  réponse,
}: {
  id: string
  question: string
  réponse: string
}) {
  const handleDetailsToggle = (id: string, isOpen: boolean) => {
    let newURL = window.location.pathname
    if (!isOpen) {
      newURL = window.location.pathname + `#${id}`
    }
    window.history.pushState(null, '', newURL)
  }

  return (
    <li key={id} className="whitespace-wrap mb-2 list-none font-bold">
      <details id={id}>
        <summary
          role="button"
          tabIndex={0}
          className="cursor-pointer border-none bg-transparent text-left text-base"
          onClick={(e) =>
            handleDetailsToggle(
              id,
              (
                e?.currentTarget?.parentElement as HTMLElement & {
                  open: boolean
                }
              )?.open ?? false
            )
          }
          onKeyDown={(e) =>
            handleDetailsToggle(
              id,
              (
                e?.currentTarget?.parentElement as HTMLElement & {
                  open: boolean
                }
              )?.open ?? false
            )
          }>
          <h3 className="inline text-black">{question}</h3>
        </summary>

        <Card className="m-4 p-2">
          <Markdown>{réponse}</Markdown>
        </Card>
      </details>
    </li>
  )
}
