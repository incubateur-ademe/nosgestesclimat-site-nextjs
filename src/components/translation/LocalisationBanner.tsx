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
              <NGCTrans>Vous utilisez la version</NGCTrans>{' '}
              <strong>{versionName}</strong> <NGCTrans>du test</NGCTrans>
              <CountryFlag code={code} />
              {code !== defaultModelRegionCode && (
                <span>
                  {' '}
                  <NGCTrans i18nKey="components.localisation.LocalisationMessage.betaMsg">
                    Elle est actuellement en version <strong>bêta</strong>.
                  </NGCTrans>
                </span>
              )}{' '}
            </p>
          )}

          {!regionParams && code && (
            <section>
              <p>
                <NGCTrans>
                  Nous avons détecté que vous faites cette simulation depuis
                </NGCTrans>{' '}
                {countryName} <CountryFlag code={code} className="inline" />.
              </p>

              <p className="mt-2">
                <b>
                  <NGCTrans i18nKey="components.localisation.LocalisationMessage.warnMessage">
                    Votre région n'est pas encore supportée, le modèle Français
                    vous est proposé par défaut
                  </NGCTrans>
                </b>{' '}
                <CountryFlag code={defaultModelRegionCode} className="inline" />
                <b>.</b>
              </p>
            </section>
          )}

          {!regionParams && !code && (
            <p className="mb-0">
              <NGCTrans i18nKey="components.localisation.LocalisationMessage.warnMessage2">
                Nous n'avons pas pu détecter votre pays de simulation, le modèle
                Français vous est proposé par défaut
              </NGCTrans>{' '}
              <CountryFlag code={defaultModelRegionCode} className="inline" />.
            </p>
          )}

          <p>
            <small>
              <Link href="/profil">
                <NGCTrans>
                  Choisissez une région parmi celles disponibles !
                </NGCTrans>
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
            <NGCTrans>J'ai compris</NGCTrans>
          </Button>
        </div>
      </div>
    </Card>
  )
}
