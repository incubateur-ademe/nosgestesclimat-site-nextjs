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
import type { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import TransClient from './trans/TransClient'

type Props = { supportedRegions: SupportedRegions }
export default function LocalisationBanner({ supportedRegions }: Props) {
  const { user, tutorials, hideTutorial } = useUser()

  const pathname = usePathname()

  const isTutorialOrTest =
    pathname.includes('/tutoriel') || pathname.includes('/simulateur/bilan')

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
    ? (regionParams?.[currentLocale]?.['gentilé'] ??
      regionParams?.[currentLocale]?.['nom'])
    : countryName

  if (tutorials.localisationBanner) return null

  if (code === defaultModelRegionCode) return null

  return (
    <Card
      className={twMerge(
        'fixed bottom-0 right-8 z-50 mx-auto mb-8 max-w-full flex-row bg-primary-50',
        isTutorialOrTest && 'bottom-12'
      )}>
      <div className="flex gap-4">
        <div className="flex-1">
          {regionParams && (
            <>
              <p className="mb-0 inline flex-1 items-baseline gap-1">
                <CountryFlag className="mr-2 inline" code={code} />
                <TransClient>Vous utilisez la version</TransClient>{' '}
                <strong>{versionName}</strong>{' '}
                <TransClient>du test</TransClient>.
              </p>

              <p className="mb-2">
                {code !== defaultModelRegionCode && (
                  <span>
                    {' '}
                    <TransClient i18nKey="components.localisation.LocalisationMessage.betaMsg">
                      Elle est actuellement en version <strong>bêta</strong>.
                    </TransClient>
                  </span>
                )}{' '}
              </p>
            </>
          )}

          {!regionParams && code && (
            <section>
              <p>
                <TransClient>
                  Nous avons détecté que vous faites cette simulation depuis
                </TransClient>{' '}
                {countryName} <CountryFlag code={code} className="inline" />.
              </p>

              <p className="mt-2">
                <b>
                  <TransClient i18nKey="components.localisation.LocalisationMessage.warnMessage">
                    Votre région n'est pas encore supportée, le modèle Français
                    vous est proposé par défaut
                  </TransClient>
                </b>{' '}
                <CountryFlag code={defaultModelRegionCode} className="inline" />
                <b>.</b>
              </p>
            </section>
          )}

          {!regionParams && !code && (
            <p className="mb-0">
              <TransClient i18nKey="components.localisation.LocalisationMessage.warnMessage2">
                Nous n'avons pas pu détecter votre pays de simulation, le modèle
                Français vous est proposé par défaut
              </TransClient>{' '}
              <CountryFlag code={defaultModelRegionCode} className="inline" />.
            </p>
          )}

          <p>
            <small>
              <Link href="/profil">
                <TransClient>
                  Choisissez une région parmi celles disponibles !
                </TransClient>
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
            <TransClient>J'ai compris</TransClient>
          </Button>
        </div>
      </div>
    </Card>
  )
}
