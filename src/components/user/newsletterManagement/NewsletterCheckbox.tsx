import CheckboxInput from '@/design-system/inputs/CheckboxInput'
import type { ReactNode } from 'react'

export interface Newsletter {
  id: number
  title: ReactNode
  description: string
}

export default function NewsletterCheckbox({
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
