'use client'

import type { ArticleType } from '@/adapters/cmsClient'
import ShareIcon from '@/components/icons/ShareIcon'
import Trans from '@/components/translation/Trans'
import CopyButton from '@/design-system/inputs/CopyButton'
import { useEffect, useState } from 'react'
import Summary from './Summary'

export default function StickySidebar({
  article,
  category,
  articleSlug,
}: {
  article: ArticleType
  category: string
  articleSlug: string
}) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      // Only apply fade effect on md breakpoint and above
      if (window.innerWidth < 768) return

      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Start fading out when within 300px of the bottom
      const fadeStart = documentHeight - 1800
      if (scrollTop > fadeStart) {
        const fadeDistance = Math.max(0, 1 - (scrollTop - fadeStart) / 300)

        setOpacity(fadeDistance)
      } else {
        setOpacity(1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{ opacity: opacity, zIndex: opacity === 0 ? -10 : 30 }}
      className="right-0 top-4 z-40 -order-1 flex w-full flex-col items-start gap-4 overflow-visible transition-opacity duration-200 md:sticky md:order-1 md:ml-auto md:h-0 md:w-[calc(33%-24px)] md:items-end md:pl-8">
      <CopyButton
        className="w-auto"
        textToCopy={`https://nosgestesclimat.fr/blog/${category}/${articleSlug}`}
        copiedStateText={<Trans>Lien copié</Trans>}>
        <ShareIcon className="mr-2 h-8 w-8 fill-primary-700" />
        <Trans>Partager l'article</Trans>
      </CopyButton>

      <Summary headings={article.headings ?? []} />
    </div>
  )
}
