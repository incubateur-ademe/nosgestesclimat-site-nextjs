'use client'

import Trans from '@/components/translation/trans/TransClient'
import InlineLink from '@/design-system/inputs/InlineLink'
import type { ThematicLandingPageSummary } from '@/services/cms/fetchThematicLandingPages'
import { fetchThematicLandingPages } from '@/services/cms/fetchThematicLandingPages'
import { useEffect, useState } from 'react'

export default function ThematicPagesSection() {
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
        console.error('Error loading thematic pages:', error)
      }
    }

    loadThematicPages()
  }, [])

  if (thematicPages.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-default mb-0 text-sm font-bold">
        <Trans i18nKey="footer.thematicLandingPages.title">
          Pages thématiques
        </Trans>
      </p>
      {thematicPages.map((page) => (
        <InlineLink
          key={page.id}
          href={`/${page.slug}`}
          className="text-default text-sm no-underline hover:underline">
          {page.title}
        </InlineLink>
      ))}
    </div>
  )
}
