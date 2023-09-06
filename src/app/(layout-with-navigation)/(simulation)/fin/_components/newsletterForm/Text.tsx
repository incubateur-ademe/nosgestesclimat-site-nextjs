import TransClient from '@/components/translation/TransClient'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
export default function Text() {
  const { data: numberSubscribers } = useNumberSubscribers()
  return (
    <>
      <h3 className="text-xl">
        <TransClient>Vous souhaitez recevoir vos résultats ?</TransClient> 💡
      </h3>
      <p>
        <TransClient>Laissez-nous votre email</TransClient>
        {numberSubscribers && (
          <span>
            <TransClient>, comme déjà </TransClient>
            <strong>
              {numberSubscribers.toLocaleString()}{' '}
              <TransClient>autres utilisateurs, </TransClient>
            </strong>
          </span>
        )}
        <TransClient> pour recevoir </TransClient>
        <strong>
          <TransClient>votre résultat</TransClient>
        </strong>{' '}
        <TransClient>et </TransClient>
        <strong>
          <TransClient>des conseils</TransClient>
        </strong>{' '}
        <TransClient>
          pour réduire votre empreinte carbone (1 fois par mois max.).{' '}
        </TransClient>
      </p>
    </>
  )
}
