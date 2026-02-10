import { getLangButtonsDisplayed } from '@/helpers/language/getLangButtonsDisplayed'
import LanguageSwitchButtonClient from './LanguageSwitchButtonClient'

export default async function LanguageSwitchButton({
  size = 'sm',
  className,
  params,
}: {
  size?: 'xs' | 'sm'
  className?: string
  params?: { category?: string; article?: string; landingPageSlug?: string }
}) {
  const langButtonsDisplayed = await getLangButtonsDisplayed(params)

  // Avoid rendering if all buttons are disabled
  if (Object.values(langButtonsDisplayed).every((value) => !value)) {
    return null
  }

  return (
    <LanguageSwitchButtonClient
      langButtonsDisplayed={langButtonsDisplayed}
      size={size}
      className={className}
    />
  )
}
