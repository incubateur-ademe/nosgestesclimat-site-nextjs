'use client'

import NewTabSvg from '@/components/icons/NewTabSvg'
import RegionGrid from '@/components/misc/RegionGrid'
import Trans from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { sortSupportedRegions } from '@/helpers/localisation/sortSupportedRegions'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import type { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'

interface Props {
  isOpen?: boolean
  supportedRegions: SupportedRegions
}

export default function RegionSelector({
  isOpen = false,
  supportedRegions,
}: Props) {
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)
  const locale = useLocale()

  const orderedSupportedRegions = sortSupportedRegions({
    supportedRegions,
    currentLocale: locale,
  })

  const numberOfRegions = Object.entries(orderedSupportedRegions).length

  const { updateRegion, user, hideTutorial } = useUser()

  const { region } = user

  const { isLoading } = useRules()

  return (
    <>
      <details open={isOpen} className="rounded-xl bg-gray-100 p-2">
        <summary
          className={`middle w-auto cursor-pointer p-4 ${
            isLoading ? 'pointer-events-none opacity-60' : ''
          }`}
          aria-expanded={isOpen}
          aria-controls="region-grid"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
            }
          }}>
          <span>
            <Trans>Choisir une autre région</Trans>{' '}
            <small title={`${numberOfRegions} régions`}>
              ({numberOfRegions} <Trans>disponibles</Trans>)
            </small>
          </span>
          {isLoading && (
            <Loader size="sm" color="dark" className="ml-4 text-right" />
          )}
          <span className="sr-only">
            <Trans>Cliquez pour ouvrir la liste des régions disponibles</Trans>
          </span>
        </summary>

        <RegionGrid
          id="region-grid"
          supportedRegions={supportedRegions}
          updateCurrentRegion={(code: string) => {
            setIsUpdateSuccess(false)

            updateRegion({
              code,
              name: supportedRegions[code][locale]?.nom as unknown as string,
            })

            hideTutorial('localisation-banner')

            setIsUpdateSuccess(true)
          }}
          selectedRegionCode={region?.code}
          className={isLoading ? 'pointer-events-none opacity-60' : ''}
          role="region"
          aria-label="Liste des régions disponibles"
        />

        {isUpdateSuccess && (
          <p
            aria-live="polite"
            role="status"
            aria-atomic="true"
            className="mt-4 mb-4 ml-2 text-sm text-green-700">
            <Trans>Votre région a bien été mise à jour.</Trans>
          </p>
        )}

        <Card className="mt-4 flex-row items-center border-none bg-transparent shadow-none">
          <Emoji className="mr-2">🌐</Emoji>
          <p className="mb-0">
            <Trans>Envie de contribuer à une version pour votre région ?</Trans>{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="align-top"
              href="https://accelerateur-transition-ecologique-ademe.notion.site/Ajouter-une-nouvelle-r-gion-f7e3a09a975d423f826ae654a788f8ba">
              <Trans>Suivez le guide !</Trans>
              <NewTabSvg className="-mt-1" />
            </a>
          </p>
        </Card>
      </details>
    </>
  )
}
