'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import { BIRTHDATE_PAGE } from '@/constants/organisations/infosPages'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import type { ChangeEvent, FormEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import Navigation from '../_components/Navigation'

export default function Birthdate() {
  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const currentSimulation = useCurrentSimulation()

  const { updateCurrentSimulation, defaultAdditionalQuestionsAnswers } =
    currentSimulation || {}

  const { saveSimulation } = useSaveSimulation()

  const [shouldSaveAndGoNext, setShouldSaveAndGoNext] = useState(false)
  useEffect(() => {
    if (shouldSaveAndGoNext) {
      try {
        saveSimulation({
          simulation: currentSimulation,
        })

        // Go to next page
        router.push(getLinkToNextInfosPage({ curPage: BIRTHDATE_PAGE }))
      } catch (e) {
        setError(true)
        return
      }
    }
  }, [shouldSaveAndGoNext])

  const [birthdate, setBirthdate] = useState<string | undefined>()
  const [error, setError] = useState(false)

  const handleSubmit = useCallback(
    (event: MouseEvent | FormEvent) => {
      // Avoid reloading page
      event?.preventDefault()
      setError(false)

      // Update simulation saved
      if (birthdate) {
        updateCurrentSimulation({
          defaultAdditionalQuestionsAnswers: {
            ...defaultAdditionalQuestionsAnswers,
            birthdate,
          },
        })

        setShouldSaveAndGoNext(true)
      }
    },
    [
      birthdate,
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
        data-cypress-id="birthdate-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre date de naissance</Trans>}
        subtitle={
          <span className="text-secondary-700 font-bold italic">
            <Trans>Facultatif</Trans>
          </span>
        }
      />

      <TextInputGroup
        name="birthdate"
        type="date"
        className="cursor-pointer"
        value={birthdate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setBirthdate(e.target.value)
        }}
      />

      {error && <DefaultSubmitErrorMessage />}

      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: BIRTHDATE_PAGE })}
        submitDisabled={!getLinkToNextInfosPage({ curPage: BIRTHDATE_PAGE })}
        handleSubmit={handleSubmit}
        currentPage={BIRTHDATE_PAGE}
      />
    </form>
  )
}
