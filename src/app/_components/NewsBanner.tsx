'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { getCurrentLangInfos } from '@/locales/translation'
import { capitaliseString } from '@/utils/capitaliseString'
import { sortReleases } from '@/utils/sortReleases'
import { useEffect, useState } from 'react'
import { useIsClient } from './IsClientCtxProvider'

export const localStorageKey = 'last-viewed-release'

export default function NewsBanner() {
  const isClient = useIsClient()

  const [lastViewedRelease, setLastViewedRelease] = useState(
    isClient && localStorage.getItem(localStorageKey)
  )

  const { t, i18n } = useClientTranslation()
  const currentLangInfos = getCurrentLangInfos(i18n)

  const releases = sortReleases(currentLangInfos.releases)
  const lastRelease = releases && releases[0]

  const handleUpdateViewedRelease = () => {
    localStorage.setItem(localStorageKey, lastRelease.name)
    setLastViewedRelease(lastRelease.name)
  }

  useEffect(() => {
    if (!lastViewedRelease) {
      window.localStorage.setItem(localStorageKey, lastRelease.name)
      setLastViewedRelease('none')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!lastRelease) {
    // Probably a problem fetching releases in the compilation step.
    // It shouldn't happen, the build should fail, but just in case,
    // this potential failure should not put the whole web site down for a side feature
    return null
  }

  // We only want to show the banner to returning visitors, so we initiate the
  // local storage value with the last release.
  const shouldShowBanner =
    lastRelease.name &&
    lastViewedRelease &&
    lastViewedRelease !== lastRelease.name

  const date = new Date(lastRelease.published_at).toLocaleDateString(
    currentLangInfos.abrvLocale,
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  if (!shouldShowBanner) {
    return null
  }

  return (
    <Card className="relative min-w-[20rem] p-8 text-left">
      <h2 className="m-0 flex items-center">
        <span className="mr-2 inline-block h-3 w-3 rounded-2xl bg-primary"></span>{' '}
        <Trans>Nouveautés</Trans>
      </h2>
      <div>
        <small className="max-w-[12rem]">
          <Trans i18nKey={'components.NewsBanner.miseAJourDate'}>
            Dernière mise à jour {{ date }}
          </Trans>
        </small>
      </div>
      <div className="mt-2">
        <Link href={'/nouveautes'}>{capitaliseString(lastRelease.name)}</Link>
      </div>
      <button
        onClick={handleUpdateViewedRelease}
        className="absolute right-2 top-2 h-8 w-8 border-none bg-transparent p-0 text-lg text-primaryDark"
        title={t('Fermer la notification de nouveautés')}>
        &times;
      </button>
    </Card>
  )
}
