'use client'

import Trans from '@/components/translation/Trans'
import { EMAIL_PAGE } from '@/constants/infosPages'
import EmailInput from '@/design-system/inputs/EmailInput'
import Title from '@/design-system/layout/Title'
import { fetchHasUserAlreadyParticipated } from '@/helpers/organisations/fetchHasUserAlreadyParticipated'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'
import Navigation from '../_components/Navigation'

export default function Email() {
  const { user, updateEmail } = useUser()

  const [email, setEmail] = useState(
    user?.email || user?.organisation?.administratorEmail || ''
  )
  const [error, setError] = useState('')

  const { t } = useClientTranslation()

  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const { pollSlug } = useOrganisationQueryParams()

  const handleSubmit = useCallback(
    async (event: MouseEvent | FormEvent) => {
      // Avoid reloading page
      event?.preventDefault()

      // If email is not valid
      if (!isEmailValid(email)) {
        setError(t('Veuillez renseigner un email valide.'))
        return
      }

      const result = await fetchHasUserAlreadyParticipated({
        pollSlug: pollSlug ?? '',
        userId: user?.userId,
        email,
      })

      if (result?.hasUserAlreadyParticipated) {
        setError(t('Vous avez déjà participé à ce sondage.'))
        return
      }

      // If email is valid
      updateEmail(email)

      // Go to next page
      router.push(getLinkToNextInfosPage({ curPage: EMAIL_PAGE }))
    },
    [
      email,
      pollSlug,
      user?.userId,
      updateEmail,
      router,
      getLinkToNextInfosPage,
      t,
    ]
  )

  return (
    <form>
      <Title
        data-cypress-id="tutoriel-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre adresse email</Trans>}
        subtitle={
          <>
            <Trans>
              Pour conserver vos résultats et les retrouver à l’avenir
            </Trans>
            <span className="ml-2 inline-block font-bold italic text-secondary-500">
              <Trans>facultatif</Trans>
            </span>
          </>
        }
      />
      <EmailInput
        email={email}
        setEmail={setEmail}
        error={error}
        setError={setError}
      />
      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: EMAIL_PAGE })}
        handleSubmit={handleSubmit}
        submitDisabled={!getLinkToNextInfosPage({ curPage: EMAIL_PAGE })}
        currentPage={EMAIL_PAGE}
      />
    </form>
  )
}
