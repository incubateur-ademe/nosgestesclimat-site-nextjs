'use client'

import CountryFlag from '@/components/misc/CountryFlag'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import RegionModelAuthors from './localisation/RegionModelAuthors'
import RegionSelector from './localisation/RegionSelector'

type Props = {
  title?: string
  supportedRegions: SuppportedRegions
}

export default function Localisation({
  title = 'Ma région de simulation',
  supportedRegions,
}: Props) {
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
      <h2 className="text-lg">
        <span
          role="img"
          aria-label="emoji pin"
          className="inline-blocl mr-3"
          aria-hidden>
          📍
        </span>
        <span>{t(title)}</span>
      </h2>

      {region?.code && (
        <div className="my-4">
          <span>
            <Trans>Vous faites cette simulation depuis :</Trans>{' '}
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
                    updateRegion(
                      initialRegion as { code: string; name: string }
                    )
                    if (tutorials.localisationBanner) {
                      showTutorial('localisationBanner')
                    }
                  }}>
                  <Trans>Revenir à ma région par défaut </Trans>{' '}
                  <span aria-label={initialRegion.name}>
                    <CountryFlag
                      code={initialRegion.code}
                      className="ml-2 inline-block"
                    />
                  </span>
                </Button>
              </div>
            )}
            <RegionModelAuthors
              authors={supportedRegions[region.code][locale].authors}
            />
          </div>
        </div>
      )}

      {!region && (
        <p>
          <Trans i18nKey="components.localisation.Localisation.warnMessage2">
            Nous n'avons pas pu détecter votre pays de simulation, le modèle
            Français vous est proposé par défaut.
          </Trans>
        </p>
      )}
      <RegionSelector supportedRegions={supportedRegions} />
    </div>
  )
}
