'use client'

import Trans from '@/components/translation/trans/TransClient'
import InlineLink from '@/design-system/inputs/InlineLink'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import type { ThematicLandingPageSummary } from '@/services/cms/fetchThematicLandingPages'
import { fetchThematicLandingPages } from '@/services/cms/fetchThematicLandingPages'
import { useEffect, useState } from 'react'

export default function ThematicPagesSection() {
  const locale = useLocale()

  const [thematicPages, setThematicPages] = useState<
    ThematicLandingPageSummary[]
  >([])

  useEffect(() => {
    const loadThematicPages = async () => {
      try {
        const result = await fetchThematicLandingPages()
        if (result?.thematicLandingPages) {
          setThematicPages(result.thematicLandingPages)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading thematic pages:', error)
      }
    }

    loadThematicPages()
  }, [])

  if (thematicPages.length === 0 || locale !== i18nConfig.defaultLocale) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-2">
      <p
        id="thematic-pages-section"
        className="text-default mb-0 text-sm font-bold">
        <Trans i18nKey="footer.thematicLandingPages.title">
          Pages thématiques
        </Trans>
      </p>
      <ul aria-labelledby="thematic-pages-section">
        {thematicPages.map((page) => (
          <li key={page.id}>
            <InlineLink
              href={`/themes/${page.slug}`}
              className="text-default text-sm no-underline hover:underline">
              {page.title}
            </InlineLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
