import PostThumbnail from '@/design-system/cms/PostThumbnail'
import ColorLine from '@/design-system/layout/ColorLine'
import type { LandingPagePostType } from '@/types/landing-page'
import type { ReactNode } from 'react'
import Trans from '../translation/Trans'

export default async function UnderstandToAct({
  description,
  posts,
}: {
  description: ReactNode
  posts: LandingPagePostType[]
}) {
  return (
    <div className="relative w-full bg-heroLightBackground py-20">
      <div className="mx-auto flex max-w-full flex-col gap-6 px-4 md:max-w-5xl md:px-0">
        <h2 className="mb-0 text-center text-2xl md:text-3xl">
          <Trans>Comprendre pour agir</Trans>
        </h2>

        <section className="mb-8 text-center text-sm md:mx-auto md:max-w-[850px] md:text-lg">
          {description}
        </section>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <PostThumbnail key={post.title} {...post} />
          ))}
        </ul>
      </div>

      <ColorLine className="bg-rainbow absolute bottom-0 left-0 h-[5px] w-[100%] animate-rainbow-slow transition-all" />
    </div>
  )
}
