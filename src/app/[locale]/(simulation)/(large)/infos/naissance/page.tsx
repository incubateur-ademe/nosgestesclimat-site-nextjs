'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import { BIRTHDATE_PAGE } from '@/constants/organisations/infosPages'
import TextInput from '@/design-system/inputs/TextInput'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useSaveAndGoNext } from '@/hooks/organisations/useSaveAndGoNext'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import Navigation from '../_components/Navigation'

export default function Birthdate() {
  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const currentSimulation = useCurrentSimulation()

  const { updateCurrentSimulation, defaultAdditionalQuestionsAnswers } =
    currentSimulation || {}

  // Handles saving the simulation current state and redirecting to next step
  const { setShouldSaveAndGoNext, errorSaveSimulation } = useSaveAndGoNext({
    curPage: BIRTHDATE_PAGE,
  })

  const [birthdate, setBirthdate] = useState<string | undefined>()

  const handleSubmit = (event: MouseEvent | FormEvent) => {
    // Avoid reloading page
    event?.preventDefault()

    if (!birthdate) {
      router.push(getLinkToNextInfosPage({ curPage: BIRTHDATE_PAGE }))
    }

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
  }

  return (
    <form>
      <Title
        data-testid="birthdate-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre date de naissance</Trans>}
        subtitle={
          <span className="text-secondary-700 font-bold italic">
            <Trans>Facultatif</Trans>
          </span>
        }
      />

      <TextInput
        name="birthdate"
        type="date"
        className="cursor-pointer"
        value={birthdate}
        autoComplete="bdate"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setBirthdate(e.target.value)
        }}
      />

      {errorSaveSimulation && <DefaultSubmitErrorMessage />}

      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: BIRTHDATE_PAGE })}
        submitDisabled={!getLinkToNextInfosPage({ curPage: BIRTHDATE_PAGE })}
        handleSubmit={handleSubmit}
        currentPage={BIRTHDATE_PAGE}
      />
    </form>
  )
}
