import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import Trans from '../translation/Trans'

export default function PollLoader() {
  return (
    <div className="py-12 text-center">
      <Loader color="dark" className="mb-8" />
      <p>
        <Trans locale={locale}>
          Nous récupérons les données de la campagne...
        </Trans>
      </p>
      <p className="text-sm text-gray-700">
        <Trans locale={locale}>
          (Cela peut durer quelques dizaines de secondes pour les campagnes avec
          un grand nombre de participants ! Merci pour votre patience.)
        </Trans>{' '}
        <Emoji>🙏</Emoji>
      </p>
    </div>
  )
}
