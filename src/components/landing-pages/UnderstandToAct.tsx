import { trackingActionClickPostThumbnail } from '@/constants/tracking/actions'
import PostThumbnail from '@/design-system/cms/PostThumbnail'
import ColorLine from '@/design-system/layout/ColorLine'
import { getLandingClickPostThumbnail } from '@/helpers/tracking/landings'
import type { LandingPagePostType } from '@/types/landing-page'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/trans/TransServer'

export default function UnderstandToAct({
  title,
  description,
  posts,
  pathname,
  locale,
}: {
  title?: ReactNode
  description?: ReactNode
  posts: Omit<LandingPagePostType, 'trackingEvent'>[]
  pathname: string
  locale: string
}) {
  return (
    <div className="relative w-full bg-heroLightBackground py-16 md:py-20">
      <div className="mx-auto flex max-w-full flex-col gap-4 px-4 md:max-w-5xl md:px-0">
        <h2
          className={twMerge(
            'mb-0 text-center text-2xl md:text-3xl',
            !description ? 'mb-10' : ''
          )}>
          {title ?? <Trans locale={locale}>Comprendre pour agir</Trans>}
        </h2>

        {description && (
          <section className="mb-10 text-center text-sm md:mx-auto md:max-w-[850px] md:text-lg">
            {description}
          </section>
        )}

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post, index) => (
            <PostThumbnail
              key={`${index}-post-thumbnail`}
              {...post}
              className="bg-white"
              trackingEvent={getLandingClickPostThumbnail(
                pathname,
                `${trackingActionClickPostThumbnail} ${index + 1}`
              )}
            />
          ))}
        </ul>
      </div>

      <ColorLine className="bg-rainbow absolute bottom-0 left-0 h-[4px] w-[100%] animate-rainbow-slow transition-all" />
    </div>
  )
}
