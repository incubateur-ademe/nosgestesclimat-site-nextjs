import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

export default function HomepageSubtitle({ locale }: { locale: Locale }) {
  return (
    <p className="mb-0">
      <strong className="text-primary-700">
        <Trans locale={locale}>Résultats immédiats, sans inscription.</Trans>
      </strong>
    </p>
  )
}
