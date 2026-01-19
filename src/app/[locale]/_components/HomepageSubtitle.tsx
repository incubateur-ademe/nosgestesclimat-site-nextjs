import ShieldIcon from '@/components/icons/ShieldIcon'
import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

export default function HomepageSubtitle({ locale }: { locale: Locale }) {
  return (
    <p className="mb-0 inline">
      <ShieldIcon className="inline" />
      <strong className="text-primary-700 inline ml-2">
        <Trans locale={locale}>Résultats immédiats, sans inscription.</Trans>
      </strong>
    </p>
  )
}
