import { getParticipantInscriptionPageVisitedEvent } from '@/constants/matomo/organisations'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  linkToPrev: string
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  submitDisabled?: boolean
  currentPage: string
}

export default function Navigation({
  linkToPrev,
  handleSubmit,
  submitDisabled,
  currentPage,
}: Props) {
  const { t } = useClientTranslation()
  return (
    <div className="my-8 flex justify-between border-b border-gray-200 pb-8">
      <ButtonLink href={linkToPrev} color="secondary" title={t('précédent')}>
        ←
      </ButtonLink>

      <Button
        data-cypress-id="next-button"
        onClick={(event) => {
          trackEvent(getParticipantInscriptionPageVisitedEvent(currentPage))

          handleSubmit(event)
        }}
        disabled={submitDisabled}>
        {t('Suivant') + ' →'}
      </Button>
    </div>
  )
}
