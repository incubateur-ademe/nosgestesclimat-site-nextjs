'use client'

import { getMatomoEventChangeRegion } from '@/constants/matomo'
import { defaultModelRegionCode } from '@/constants/translation'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useGetSupportedRegions } from '@/hooks/useGetSupportedRegions'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { capitaliseString } from '@/utils/capitaliseString'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Link from '../Link'
import CountryFlag from '../misc/CountryFlag'
import TransClient from './TransClient'

export default function LocalisationBanner() {
  const { t } = useClientTranslation()

  const { user, tutorials, hideTutorial } = useUser()

  const currentLocale = useLocale() as string

  const { code } = user?.region ?? {}

  const { data: supportedRegions } = useGetSupportedRegions()

  if (!supportedRegions) return null

  const regionParams: any = supportedRegions?.[code]

  const countryName = capitaliseString(
    regionParams?.[currentLocale]?.nom as string
  )

  const versionName = regionParams
    ? regionParams?.[currentLocale]?.['gentilé'] ??
      regionParams?.[currentLocale]?.['nom']
    : countryName

  if (tutorials.localisationBanner) return

  if (code === defaultModelRegionCode) return

  return (
    <Card
      className="mx-auto mb-8 w-[32rem] max-w-full bg-[]"
      style={{ backgroundColor: '#fff8d3' }}>
      <div className="flex gap-8">
        <div className="flex w-8 items-center text-4xl">📍</div>
        <div className="flex-1">
          {regionParams && (
            <p className="mb-0 flex items-baseline gap-1">
              {t('components.localisation.LocalisationMessage.version', {
                versionName,
              })}
              <CountryFlag code={code} />
              {code !== defaultModelRegionCode && (
                <span>
                  {' '}
                  <TransClient i18nKey="components.localisation.LocalisationMessage.betaMsg">
                    Elle est actuellement en version <strong>bêta</strong>.
                  </TransClient>
                </span>
              )}{' '}
            </p>
          )}

          {!regionParams && code && (
            <section>
              <TransClient>
                Nous avons détecté que vous faites cette simulation depuis
              </TransClient>{' '}
              {countryName}
              <CountryFlag code={code} />.
              <p className="mt-2">
                <b>
                  <TransClient i18nKey="components.localisation.LocalisationMessage.warnMessage">
                    Votre région n'est pas encore supportée, le modèle Français
                    vous est proposé par défaut
                  </TransClient>
                </b>
                <CountryFlag code={defaultModelRegionCode} />
                <b>.</b>
              </p>
            </section>
          )}

          {!regionParams && !code && (
            <p className="mb-0">
              <TransClient i18nKey="components.localisation.LocalisationMessage.warnMessage2">
                Nous n'avons pas pu détecter votre pays de simulation, le modèle
                Français vous est proposé par défaut
              </TransClient>
              <CountryFlag code={defaultModelRegionCode} />.
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
            onClick={() => {
              hideTutorial('localisationBanner')

              trackEvent(getMatomoEventChangeRegion(code))
            }}>
            <TransClient>J'ai compris</TransClient>
          </Button>
        </div>
      </div>
    </Card>
  )
}
