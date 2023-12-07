'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { getCurrentLangInfos } from '@/locales/translation'
import { Post } from '@/types/posts'
import { capitalizeString } from '@/utils/capitalizeString'
import { useEffect, useState } from 'react'

const localStorageKey = 'last-viewed-release'

type Props = {
  releases: Post[]
}
export default function Banner({ releases }: Props) {
  const { t, i18n } = useClientTranslation()
  const currentLangInfos = getCurrentLangInfos(i18n)

  const lastRelease = releases.sort((itemA, itemB) =>
    new Date(itemA.data.date || '') > new Date(itemB.data.date || '') ? -1 : 1
  )[0]

  const [shouldShowBanner, setShouldShowBanner] = useState<boolean>(false)
  useEffect(() => {
    const localLastViewedRelease = localStorage.getItem(localStorageKey)
    if (localLastViewedRelease) {
      setShouldShowBanner(
        localStorage.getItem(localStorageKey) !== lastRelease.slug
          ? true
          : false
      )
    } else {
      localStorage.setItem(localStorageKey, 'none')
    }
  }, [lastRelease])

  const handleUpdateViewedRelease = () => {
    localStorage.setItem(localStorageKey, lastRelease.slug)
    setShouldShowBanner(false)
  }

  const date = new Date(lastRelease.data.date || '').toLocaleDateString(
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
    <Card className="relative min-w-[20rem] p-4 text-left">
      <h2 className="m-0 flex items-center">
        <span className="mr-2 inline-block h-3 w-3 rounded-2xl bg-primary-500"></span>{' '}
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
        <Link onClick={handleUpdateViewedRelease} href={'/nouveautes'}>
          {capitalizeString(lastRelease.slug)}
        </Link>
      </div>
      <button
        onClick={handleUpdateViewedRelease}
        className="absolute right-0 top-0 h-8 w-8 border-none bg-transparent p-0 text-lg text-primary-700"
        title={t('Fermer la notification de nouveautés')}>
        &times;
      </button>
    </Card>
  )
}
