'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import LandingContentEn from '@/locales/pages/en/landing.mdx'
import LandingContentFr from '@/locales/pages/fr/landing.mdx'
import ListedAdvantages from './ListedAdvantaged'
import OpenSourceBlock from './OpenSourceBlock'
import QuestionsBlock from './QuestionsBlock'

// Commented until validation by a native speaker
// import contentEs from '../../locales/pages/es/landing.md'
// import contentIt from '../../locales/pages/it/landing.md'

export default function LandingExplanations() {
  const { isIframe } = useIframe()

  const lang = useLocale()

  const LandingContent = getLocalisedMDX({
    dictionnaries: {
      fr: LandingContentFr,
      en: LandingContentEn,
    },
    locale: lang || '',
  })

  if (isIframe) return null

  return (
    <>
      <div className="bg-primaryLight px-4 py-10 xl:rounded-md">
        <div className="mx-auto w-full max-w-3xl">
          <LandingContent />
        </div>
      </div>

      <OpenSourceBlock>
        <ListedAdvantages />
      </OpenSourceBlock>

      <QuestionsBlock />
    </>
  )
}
