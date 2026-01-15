//@TODO: Make this component fetch dynamically the number of completed simulations
import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

export default function DynamicCounter({ locale }: { locale: Locale }) {
  return (
    <p className="mb-0 text-center text-xl md:text-2xl">
      <strong className="text-primary-700">
        <Trans locale={locale}>2,7 millions de personnes</Trans>
      </strong>{' '}
      <span>
        <Trans locale={locale}>ont déjà calculé leur empreinte</Trans>
      </span>
    </p>
  )
}
