'use client'

import Trans from '@/components/translation/Trans'
import { POSTAL_CODE_PAGE } from '@/constants/infosPages'
import PostalCodeInput from '@/design-system/inputs/PostalCodeInput'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useContext } from 'react'
import { InfosContext } from '../_components/InfosProvider'
import Navigation from '../_components/Navigation'

export default function PostalCode() {
  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const { postalCode, setPostalCode } = useContext(InfosContext)

  const handleSubmit = useCallback(
    async (event: MouseEvent | FormEvent) => {
      // Avoid reloading page
      event?.preventDefault()

      // Go to next page
      router.push(getLinkToNextInfosPage({ curPage: POSTAL_CODE_PAGE }))
    },
    [router, getLinkToNextInfosPage]
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

      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: POSTAL_CODE_PAGE })}
        submitDisabled={!getLinkToNextInfosPage({ curPage: POSTAL_CODE_PAGE })}
        handleSubmit={handleSubmit}
        currentPage={POSTAL_CODE_PAGE}
      />
    </form>
  )
}
