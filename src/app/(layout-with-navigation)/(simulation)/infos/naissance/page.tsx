'use client'

import { BIRTHDATE_PAGE } from '@/constants/infosPages'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useContext } from 'react'
import { InfosContext } from '../_components/InfosProvider'
import Navigation from '../_components/Navigation'

export default function Birthdate() {
  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const { birthdate, setBirthdate } = useContext(InfosContext)

  const handleSubmit = useCallback(
    async (event: MouseEvent | FormEvent) => {
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
        title={<NGCTrans>Votre date de naissance</NGCTrans>}
        subtitle={
          <span className="font-bold italic text-secondary-700">
            <NGCTrans>Facultatif</NGCTrans>
          </span>
        }
      />
      <TextInputGroup
        name="birthdate"
        type="date"
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
