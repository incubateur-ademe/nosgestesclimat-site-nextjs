'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import { POSTAL_CODE_PAGE } from '@/constants/organisations/infosPages'
import PostalCodeInput from '@/design-system/inputs/PostalCodeInput'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import Navigation from '../_components/Navigation'

export default function PostalCode() {
  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()
  const { updateCurrentSimulation, defaultAdditionalQuestionsAnswers } =
    useCurrentSimulation()

  const [postalCode, setPostalCode] = useState<string | undefined>(undefined)
  const [error, setError] = useState(false)

  const currentSimulation = useCurrentSimulation()

  const { saveSimulation } = useSaveSimulation()

  const [shouldSaveAndGoNext, setShouldSaveAndGoNext] = useState(false)
  useEffect(() => {
    if (shouldSaveAndGoNext) {
      try {
        saveSimulation({
          simulation: currentSimulation,
        })

        // Go to next page
        router.push(getLinkToNextInfosPage({ curPage: POSTAL_CODE_PAGE }))
      } catch (e) {
        setError(true)
        return
      }
    }
  }, [shouldSaveAndGoNext])

  const handleSubmit = useCallback(
    (event: MouseEvent | FormEvent) => {
      // Avoid reloading page
      event?.preventDefault()
      setError(false)

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
    },
    [
      postalCode,
      router,
      getLinkToNextInfosPage,
      updateCurrentSimulation,
      defaultAdditionalQuestionsAnswers,
      saveSimulation,
      currentSimulation,
    ]
  )

  return (
    <form>
      <Title
        data-cypress-id="postal-code-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre code postal</Trans>}
        subtitle={
          <span className="text-secondary-700 font-bold italic">
            <Trans>Facultatif</Trans>
          </span>
        }
      />

      <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} />

      {error && <DefaultSubmitErrorMessage />}

      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: POSTAL_CODE_PAGE })}
        submitDisabled={!getLinkToNextInfosPage({ curPage: POSTAL_CODE_PAGE })}
        handleSubmit={handleSubmit}
        currentPage={POSTAL_CODE_PAGE}
      />
    </form>
  )
}
