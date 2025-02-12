/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client'

import NewTabSvg from '@/components/icons/NewTabSvg'
import RegionGrid from '@/components/misc/RegionGrid'
import Trans from '@/components/translation/Trans'
import {
  profilClickRegion,
  profilOpenRegions,
} from '@/constants/tracking/pages/profil'
import Card from '@/design-system/layout/Card'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { sortSupportedRegions } from '@/helpers/localisation/sortSupportedRegions'
import { displaySuccessToast } from '@/helpers/toasts/displaySuccessToast'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import type { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  isOpen?: boolean
  supportedRegions: SupportedRegions
}

export default function RegionSelector({
  isOpen = false,
  supportedRegions,
}: Props) {
  const locale = useLocale()

  const { t } = useClientTranslation()

  const orderedSupportedRegions = sortSupportedRegions({
    supportedRegions,
    currentLocale: locale,
  })

  const numberOfRegions = Object.entries(orderedSupportedRegions).length

  const { updateRegion, user, tutorials, showTutorial } = useUser()

  const { region } = user

  const { isLoading } = useRules()

  return (
    <>
      <details open={isOpen} className="rounded-xl bg-gray-100 p-2">
        <summary
          className={`middle w-auto cursor-pointer   p-4 ${
            isLoading ? 'pointer-events-none opacity-60' : ''
          }`}
          onClick={() => trackEvent(profilOpenRegions)}>
          <span>
            <Trans>Choisir une autre région</Trans>{' '}
            <small title={`${numberOfRegions} régions`}>
              ({numberOfRegions} <Trans>disponibles</Trans>)
            </small>
          </span>
          {isLoading && (
            <Loader size="sm" color="dark" className="ml-4 text-right" />
          )}
        </summary>

        <RegionGrid
          supportedRegions={supportedRegions}
          updateCurrentRegion={(code: string) => {
            trackEvent(profilClickRegion(code))

            updateRegion({
              code,
              name: supportedRegions[code][locale]?.nom as unknown as string,
            })

            displaySuccessToast(t('Votre région a bien été mise à jour.'))

            if (tutorials.localisationBanner) {
              showTutorial('localisationBanner')
            }
          }}
          selectedRegionCode={region?.code}
          className={isLoading ? 'pointer-events-none opacity-60' : ''}
          aria-disabled={isLoading || undefined}
        />
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
              <NewTabSvg className="!-mt-1" />
            </a>
          </p>
        </Card>
      </details>
    </>
  )
}
