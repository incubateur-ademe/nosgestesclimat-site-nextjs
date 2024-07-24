'use client'

import {
  BIRTHDATE_PAGE,
  EMAIL_PAGE,
  POSTAL_CODE_PAGE,
} from '@/constants/infosPages'
import {
  infosBirthdateClickPrecedent,
  infosBirthdateClickSuivant,
  infosEmailClickPrecedent,
  infosEmailClickSuivant,
  infosPostalCodeClickPrecedent,
  infosPostalCodeClickSuivant,
} from '@/constants/tracking/pages/infos'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  linkToPrev: string
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void
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
      <ButtonLink
        href={linkToPrev}
        color="secondary"
        title={t('précédent')}
        onClick={() => {
          if (currentPage === EMAIL_PAGE) {
            trackEvent(infosEmailClickPrecedent)
            return
          }
          if (currentPage === POSTAL_CODE_PAGE) {
            trackEvent(infosPostalCodeClickPrecedent)
          }
          if (currentPage === BIRTHDATE_PAGE) {
            trackEvent(infosBirthdateClickPrecedent)
          }
        }}>
        ←
      </ButtonLink>

      <Button
        data-cypress-id="next-button"
        onClick={(event) => {
          if (currentPage === EMAIL_PAGE) {
            trackEvent(infosEmailClickSuivant)
          }

          if (currentPage === POSTAL_CODE_PAGE) {
            trackEvent(infosPostalCodeClickSuivant)
          }

          if (currentPage === BIRTHDATE_PAGE) {
            trackEvent(infosBirthdateClickSuivant)
          }
          if (handleSubmit) handleSubmit(event)
        }}
        disabled={submitDisabled}>
        {t('Suivant') + ' →'}
      </Button>
    </div>
  )
}
