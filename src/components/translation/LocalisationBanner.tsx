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
import Trans from './Trans'

type Props = {
  supportedRegions: SupportedRegions
}
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
        'bg-primary-50 fixed right-8 bottom-0 z-50 mx-auto mb-8 max-w-full flex-row',
        isTutorialOrTest && 'bottom-12'
      )}>
      <div className="flex gap-4">
        <div className="flex-1">
          {regionParams && (
            <>
              <p className="mb-0 inline flex-1 items-baseline gap-1">
                <CountryFlag className="mr-2 inline" code={code} />
                <Trans locale={currentLocale}>
                  Vous utilisez la version
                </Trans>{' '}
                <strong>{versionName}</strong>{' '}
                <Trans locale={currentLocale}>du test</Trans>.
              </p>

              <p className="mb-2">
                {code !== defaultModelRegionCode && (
                  <span>
                    {' '}
                    <Trans
                      locale={currentLocale}
                      i18nKey="components.localisation.LocalisationMessage.betaMsg">
                      Elle est actuellement en version <strong>bêta</strong>.
                    </Trans>
                  </span>
                )}{' '}
              </p>
            </>
          )}

          {!regionParams && code && (
            <section>
              <p>
                <Trans locale={currentLocale}>
                  Nous avons détecté que vous faites cette simulation depuis
                </Trans>{' '}
                {countryName} <CountryFlag code={code} className="inline" />.
              </p>

              <p className="mt-2">
                <b>
                  <Trans
                    locale={currentLocale}
                    i18nKey="components.localisation.LocalisationMessage.warnMessage">
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
              <Trans
                locale={currentLocale}
                i18nKey="components.localisation.LocalisationMessage.warnMessage2">
                Nous n'avons pas pu détecter votre pays de simulation, le modèle
                Français vous est proposé par défaut
              </Trans>{' '}
              <CountryFlag code={defaultModelRegionCode} className="inline" />.
            </p>
          )}

          <p>
            <small>
              <Link href="/profil">
                <Trans locale={currentLocale}>
                  Choisissez une région parmi celles disponibles !
                </Trans>
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
            <Trans locale={currentLocale}>J'ai compris</Trans>
          </Button>
        </div>
      </div>
    </Card>
  )
}
