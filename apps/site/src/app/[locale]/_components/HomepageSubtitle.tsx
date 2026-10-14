import ShieldIcon from '@/components/icons/ShieldIcon'
import Trans from '@/components/translation/trans/TransServer'

export default function HomepageSubtitle() {
  return (
    <p className="mb-0 inline-block items-center">
      <ShieldIcon className="mr-2 inline" />
      <strong className="text-primary-700 inline">
        <Trans>Résultats immédiats, confidentiel et gratuit.</Trans>
      </strong>
    </p>
  )
}
