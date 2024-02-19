'use client'

import Trans from '@/components/translation/Trans'
import { EMAIL_PAGE } from '@/constants/infosPages'
import EmailInput from '@/design-system/inputs/EmailInput'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import Navigation from '../_components/Navigation'

export default function Email() {
  const { t } = useClientTranslation()

  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const { user, updateEmail } = useUser()

  const [email, setEmail] = useState('')

  const [error, setError] = useState('')

  useEffect(() => {
    setEmail(user?.email || '')
  }, [user])

  const handleSubmit = useCallback(
    async (event: MouseEvent | FormEvent) => {
      // Avoid reloading page
      event?.preventDefault()

      // If email is not valid
      if (!isEmailValid(email)) {
        setError(t('Veuillez renseigner un email valide.'))
        return
      }

      // If email is valid
      updateEmail(email)

      // Go to next page
      router.push(getLinkToNextInfosPage({ curPage: EMAIL_PAGE }))
    },
    [email, updateEmail, t, router, getLinkToNextInfosPage]
  )

  return (
    <form>
      <Title
        data-cypress-id="tutoriel-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre adresse email</Trans>}
        subtitle={t(
          'Pour conserver vos résultats et les retrouver à l’avenir - facultatif'
        )}
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
      />
    </form>
  )
}
