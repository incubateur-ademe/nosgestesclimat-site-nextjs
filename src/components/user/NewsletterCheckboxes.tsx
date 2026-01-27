import CheckboxInput from '@/design-system/inputs/CheckboxInput'
import type { ReactNode } from 'react'
import { NEWSLETTERS } from './_constants/newsletters'

export interface Newsletter {
  id: number
  title: ReactNode
  description: string
}

function NewsletterCheckbox({
  newsletter,
  name,
  ...inputProps
}: {
  newsletter: Newsletter
  name: string
}) {
  return (
    <div className="w-xl max-w-full">
      <CheckboxInput
        name={name}
        label={<span className="text-lg font-bold">{newsletter.title}</span>}
        aria-describedby={`newsletter-${newsletter.id}-description`}
        disableSubmitOnEnter
        {...inputProps}
      />
      <p
        id={`newsletter-${newsletter.id}-description`}
        className="mt-2 mb-0 pl-6">
        {newsletter.description}
      </p>
    </div>
  )
}

export default function NewsletterCheckBoxes() {
  return (
    <section>
      {(NEWSLETTERS as (Newsletter & { 'data-testid'?: string })[]).map(
        (newsletter) => (
          <NewsletterCheckbox
            name={`newsletterIds.${newsletter.id}`}
            key={newsletter.id}
            newsletter={newsletter}
            data-testid={newsletter['data-testid']}
          />
        )
      )}
    </section>
  )
}
