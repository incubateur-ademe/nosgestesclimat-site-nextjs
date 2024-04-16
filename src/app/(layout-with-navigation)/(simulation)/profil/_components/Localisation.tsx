'use client'

import FlagIcon from '@/components/icons/FlagIcon'
import CountryFlag from '@/components/misc/CountryFlag'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { RegionFromGeolocation } from '@/publicodes-state/types'
import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import RegionModelAuthors from './localisation/RegionModelAuthors'
import RegionSelector from './localisation/RegionSelector'

type Props = {
  supportedRegions: SupportedRegions
}

export default function Localisation({ supportedRegions }: Props) {
  const { t } = useClientTranslation()
  const locale = useLocale()

  const { user, updateRegion, tutorials, showTutorial } = useUser()
  const { region, initialRegion } = user || {}

  const isRegionSupported = Object.keys(supportedRegions)?.some(
    (supportedRegion: string) => supportedRegion === region?.code
  )

  const { iframeRegion } = useIframe()

  if (iframeRegion) return null

  return (
    <div className="mb-8 mt-4 sm:mt-8">
      <h2 id="answers" className="flex items-center">
        <FlagIcon className="mr-3 fill-primary-700" aria-hidden />

        <span>
          <NGCTrans>Ma région de simulation</NGCTrans>
        </span>
      </h2>
      {region?.code && (
        <div className="my-4">
          <span>
            <NGCTrans>Vous faites cette simulation depuis :</NGCTrans>{' '}
            <strong>{region.name}</strong>
            <CountryFlag code={region.code} className="ml-2 inline-block" />.
          </span>
          {!isRegionSupported && (
            <>
              {t('components.localisation.Localisation.warnMessage', {
                countryName: region.name,
              })}
            </>
          )}

          <div className="flex items-baseline gap-2">
            {initialRegion && region.code !== initialRegion.code && (
              <div className="mt-2">
                <Button
                  color="text"
                  size="sm"
                  onClick={() => {
                    updateRegion(initialRegion as RegionFromGeolocation)
                    if (tutorials.localisationBanner) {
                      showTutorial('localisationBanner')
                    }
                  }}>
                  <NGCTrans>Revenir à ma région par défaut </NGCTrans>{' '}
                  <span aria-label={initialRegion.name}>
                    <CountryFlag
                      code={initialRegion.code}
                      className="ml-2 inline-block"
                    />
                  </span>
                </Button>
              </div>
            )}
            {isRegionSupported && (
              <RegionModelAuthors
                authors={supportedRegions[region.code][locale].authors}
              />
            )}
          </div>
        </div>
      )}

      {!region && (
        <p>
          <NGCTrans i18nKey="components.localisation.Localisation.warnMessage2">
            Nous n'avons pas pu détecter votre pays de simulation, le modèle
            Français vous est proposé par défaut.
          </NGCTrans>
        </p>
      )}
      <RegionSelector supportedRegions={supportedRegions} />
    </div>
  )
}
