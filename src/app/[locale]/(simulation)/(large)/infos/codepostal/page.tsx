'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import { POSTAL_CODE_PAGE } from '@/constants/organisations/infosPages'
import PostalCodeInput from '@/design-system/inputs/PostalCodeInput'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useSaveAndGoNext } from '@/hooks/organisations/useSaveAndGoNext'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useState } from 'react'
import Navigation from '../_components/Navigation'

export default function PostalCode() {
  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()
  const { updateCurrentSimulation, defaultAdditionalQuestionsAnswers } =
    useCurrentSimulation()

  const router = useRouter()

  const [postalCode, setPostalCode] = useState<string | undefined>(undefined)

  // Handles saving the simulation current state and redirecting to next step
  const { setShouldSaveAndGoNext, errorSaveSimulation } = useSaveAndGoNext({
    curPage: POSTAL_CODE_PAGE,
  })

  const handleSubmit = (event: MouseEvent | FormEvent) => {
    // Avoid reloading page
    event?.preventDefault()

    if (!postalCode) {
      router.push(getLinkToNextInfosPage({ curPage: POSTAL_CODE_PAGE }))
    }

    // Update simulation saved
    if (postalCode) {
      updateCurrentSimulation({
        defaultAdditionalQuestionsAnswers: {
          ...defaultAdditionalQuestionsAnswers,
          postalCode,
        },
      })

      // Trigger save in order to let state update before it
      setShouldSaveAndGoNext(true)
    }
  }

  return (
    <form>
      <Title
        data-testid="postal-code-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre code postal</Trans>}
        subtitle={
          <span className="text-secondary-700 font-bold italic">
            <Trans>Facultatif</Trans>
          </span>
        }
      />

      <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} />

      {errorSaveSimulation && <DefaultSubmitErrorMessage />}

      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: POSTAL_CODE_PAGE })}
        submitDisabled={!getLinkToNextInfosPage({ curPage: POSTAL_CODE_PAGE })}
        handleSubmit={handleSubmit}
      />
    </form>
  )
}
