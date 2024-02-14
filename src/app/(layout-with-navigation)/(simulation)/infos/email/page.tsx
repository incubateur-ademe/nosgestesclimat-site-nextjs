'use client'

import Trans from '@/components/translation/Trans'
import EmailInput from '@/design-system/inputs/EmailInput'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useAppNavigation } from '@/hooks/useNavigation'
import { useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import Navigation from '../_components/Navigation'

export default function Email() {
  const { t } = useClientTranslation()

  const router = useRouter()

  const { linkToTutorial, getLinkToInfosPage } = useAppNavigation()

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
      router.push(getLinkToInfosPage(1))
    },
    [email, updateEmail, t, router, getLinkToInfosPage]
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
        linkToPrev={linkToTutorial}
        handleSubmit={handleSubmit}
        submitDisabled={!getLinkToInfosPage(1)}
      />
    </form>
  )
}
