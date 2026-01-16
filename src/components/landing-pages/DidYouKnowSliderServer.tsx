import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import { type ComponentProps, Suspense } from 'react'
import DidYouKnowSlider from './DidYouKnowSlider'

export default async function DidYouKnowSliderServer(
  props: Omit<ComponentProps<typeof DidYouKnowSlider>, 'isAuthenticated'>
) {
  const isAuthenticated = await isUserAuthenticated()
  return (
    <Suspense fallback={<BlockSkeleton />}>
      <DidYouKnowSlider {...props} isAuthenticated={isAuthenticated} />
    </Suspense>
  )
}
