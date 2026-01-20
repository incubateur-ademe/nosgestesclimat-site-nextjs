import CheckboxInput from '@/design-system/inputs/CheckboxInput'
export interface Newsletter {
  id: number
  title: string
  description: string
}

export default function NewsletterCheckbox({
  newsletter,
  ...inputProps
}: {
  newsletter: Newsletter
}) {
  return (
    <div>
      <CheckboxInput
        name={`newsletter-${newsletter.id}`}
        label={newsletter.title}
        {...inputProps}
      />
      <p className="mb-0">{newsletter.description}</p>
    </div>
  )
}
