//@TODO: Make this component fetch dynamically the number of completed simulations
import Trans from '@/components/translation/trans/TransServer'

export default function DynamicCounter() {
  return (
    <p className="mb-0 text-center text-xl md:text-2xl">
      <Trans i18nKey="homepage.dynamicCounter.text">
        <strong className="text-primary-700">3 millions</strong>{' '}
        <span>de simulations d’empreinte carbone déjà réalisées</span>
      </Trans>
    </p>
  )
}
