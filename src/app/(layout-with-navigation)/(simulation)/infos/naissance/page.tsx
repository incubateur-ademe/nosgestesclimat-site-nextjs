'use client'

import Trans from '@/components/translation/Trans'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useAppNavigation } from '@/hooks/navigation/useAppNavigation'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useContext } from 'react'
import { InfosContext } from '../_components/InfosProvider'
import Navigation from '../_components/Navigation'

export default function Birthdate() {
  const router = useRouter()

  const { getLinkToInfosPage } = useAppNavigation()

  const { birthdate, setBirthdate } = useContext(InfosContext)

  const handleSubmit = useCallback(
    async (event: MouseEvent | FormEvent) => {
      // Avoid reloading page
      event?.preventDefault()

      // Go to next page
      router.push(getLinkToInfosPage(3))
    },
    [router, getLinkToInfosPage]
  )

  return (
    <form>
      <Title
        data-cypress-id="birthdate-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre date de naissance</Trans>}
        subtitle={<Trans>Facultatif</Trans>}
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
        linkToPrev={getLinkToInfosPage(2)}
        handleSubmit={handleSubmit}
      />
    </form>
  )
}
