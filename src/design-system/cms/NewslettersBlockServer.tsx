import { isUserAuthenticated } from '@/helpers/server/model/user'
import { Suspense } from 'react'
import NewslettersBlock from './NewslettersBlock'
import NewslettersBlockSkeleton from './NewslettersBlockSkeleton'

export default async function NewslettersBlockServer() {
  const isAuthenticated = await isUserAuthenticated()
  return (
    <Suspense fallback={<NewslettersBlockSkeleton />}>
      <NewslettersBlock isAuthenticated={isAuthenticated} />
    </Suspense>
  )
}
