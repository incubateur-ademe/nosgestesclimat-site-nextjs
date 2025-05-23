'use client'

import Trans from '@/components/translation/trans/TransClient'
import { BIRTHDATE_PAGE } from '@/constants/organisations/infosPages'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useRouter } from 'next/navigation'
import type { ChangeEvent, FormEvent } from 'react'
import { useCallback, useContext } from 'react'
import { InfosContext } from '../_components/InfosProvider'
import Navigation from '../_components/Navigation'

export default function Birthdate() {
  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const { birthdate, setBirthdate } = useContext(InfosContext)

  const handleSubmit = useCallback(
    (event: MouseEvent | FormEvent) => {
      // Avoid reloading page
      event?.preventDefault()

      // Go to next page
      router.push(getLinkToNextInfosPage({ curPage: BIRTHDATE_PAGE }))
    },
    [router, getLinkToNextInfosPage]
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

      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: BIRTHDATE_PAGE })}
        submitDisabled={!getLinkToNextInfosPage({ curPage: BIRTHDATE_PAGE })}
        handleSubmit={handleSubmit}
        currentPage={BIRTHDATE_PAGE}
      />
    </form>
  )
}
