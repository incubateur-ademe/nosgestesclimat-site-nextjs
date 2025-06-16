'use client'

import Card from '@/design-system/layout/Card'
import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'

export default function FAQListItem({
  id,
  question,
  answer,
}: {
  id: string
  question: string
  answer: string
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
          onKeyDown={onKeyDownHelper((e) =>
            handleDetailsToggle(
              id,
              (
                e?.currentTarget?.parentElement as HTMLElement & {
                  open: boolean
                }
              )?.open ?? false
            )
          )}>
          <h3 className="inline text-black">{question}</h3>
        </summary>

        <Card className="bg-primary-50 markdown m-4 rounded-sm border-none p-4 font-normal">
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        </Card>
      </details>
    </li>
  )
}
