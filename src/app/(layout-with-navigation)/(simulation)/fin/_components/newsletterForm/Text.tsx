import Trans from '@/components/translation/Trans'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
export default function Text() {
  const { data: numberSubscribers } = useNumberSubscribers()
  return (
    <>
      <h3 className="text-xl">
        <Trans>Vous souhaitez recevoir vos résultats ?</Trans> 💡
      </h3>
      <p>
        <Trans>Laissez-nous votre email</Trans>
        {numberSubscribers ? (
          <span>
            <Trans>, comme déjà </Trans>
            <strong>
              {numberSubscribers.toLocaleString()}{' '}
              <Trans>autres utilisateurs, </Trans>
            </strong>
          </span>
        ) : null}{' '}
        <Trans i18nKey="newsLetter.Text.p2">
          pour recevoir <strong>votre résultat</strong> et{' '}
          <strong>des conseils</strong> pour réduire votre empreinte carbone (1
          fois par mois max).
        </Trans>{' '}
      </p>
    </>
  )
}
