'use client'

import Link from '@/components/Link'
import CountryFlag from '@/components/misc/CountryFlag'
import { trackingClickRegionBanner } from '@/constants/tracking/misc'
import { defaultModelRegionCode } from '@/constants/translation'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import Trans from './Trans'

type Props = {
  supportedRegions: SupportedRegions
}
export default function LocalisationBanner({ supportedRegions }: Props) {
  const { user, tutorials, hideTutorial } = useUser()

  const currentLocale = useLocale() as string

  const region = user?.region
  const code = user?.region?.code ?? 'FR'

  const { iframeRegion } = useIframe()

  if (iframeRegion) return null

  if (!supportedRegions) return null

  const regionParams: any = supportedRegions?.[code]

  const countryName =
    capitalizeString(regionParams?.[currentLocale]?.nom as string) ||
    region?.name

  const versionName: string = regionParams
    ? regionParams?.[currentLocale]?.['gentilé'] ??
      regionParams?.[currentLocale]?.['nom']
    : countryName

  if (tutorials.localisationBanner) return null

  if (code === defaultModelRegionCode) return null

  return (
    <Card className="mx-auto mb-8 w-[32rem] max-w-full flex-row border-none bg-[#fff8d3]">
      <div className="flex gap-8">
        <div className="flex w-8 items-center text-4xl">📍</div>
        <div className="flex-1">
          {regionParams && (
            <p className="mb-0 flex-1 items-baseline gap-1">
              <Trans>Vous utilisez la version</Trans>{' '}
              <strong>{versionName}</strong> <Trans>du test</Trans>
              <CountryFlag code={code} />
              {code !== defaultModelRegionCode && (
                <span>
                  {' '}
                  <Trans i18nKey="components.localisation.LocalisationMessage.betaMsg">
                    Elle est actuellement en version <strong>bêta</strong>.
                  </Trans>
                </span>
              )}{' '}
            </p>
          )}

          {!regionParams && code && (
            <section>
              <p>
                <Trans>
                  Nous avons détecté que vous faites cette simulation depuis
                </Trans>{' '}
                {countryName} <CountryFlag code={code} className="inline" />.
              </p>

              <p className="mt-2">
                <b>
                  <Trans i18nKey="components.localisation.LocalisationMessage.warnMessage">
                    Votre région n'est pas encore supportée, le modèle Français
                    vous est proposé par défaut
                  </Trans>
                </b>{' '}
                <CountryFlag code={defaultModelRegionCode} className="inline" />
                <b>.</b>
              </p>
            </section>
          )}

          {!regionParams && !code && (
            <p className="mb-0">
              <Trans i18nKey="components.localisation.LocalisationMessage.warnMessage2">
                Nous n'avons pas pu détecter votre pays de simulation, le modèle
                Français vous est proposé par défaut
              </Trans>{' '}
              <CountryFlag code={defaultModelRegionCode} className="inline" />.
            </p>
          )}

          <p>
            <small>
              <Link href="/profil">
                <Trans>Choisissez une région parmi celles disponibles !</Trans>
              </Link>
            </small>
          </p>

          <Button
            size="sm"
            className="ml-auto block"
            data-cypress-id="understood-localisation-button"
            onClick={() => {
              hideTutorial('localisationBanner')

              trackEvent(trackingClickRegionBanner)
            }}>
            <Trans>J'ai compris</Trans>
          </Button>
        </div>
      </div>
    </Card>
  )
}
