import { getShouldDisplayLangButtons } from '@/helpers/language/getShouldDisplayLangButtons'
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
  const shouldDisplayLangButtons = await getShouldDisplayLangButtons(params)

  // Avoid rendering if all buttons are disabled
  if (!shouldDisplayLangButtons) {
    return null
  }

  return <LanguageSwitchButtonClient size={size} className={className} />
}
