//@TODO: Make this component fetch dynamically the number of completed simulations
import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

export default function DynamicCounter({ locale }: { locale: Locale }) {
  return (
    <p className="mb-0 text-center text-xl md:text-2xl">
      <Trans locale={locale}>
        <strong className="text-primary-700">2,7 millions de personnes</strong>{' '}
        <span>ont déjà calculé leur empreinte</span>
      </Trans>
    </p>
  )
}
