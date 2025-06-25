import { fetchThematicLandingPage } from '@/services/cms/fetchThematicLandingPage'
import type { DefaultPageProps } from '@/types'

export default async function ThematicLandingPage({
  params,
}: DefaultPageProps<{ params: Promise<{ landingPageSlug: string }> }>) {
  const { landingPageSlug } = await params
  const result = await fetchThematicLandingPage({
    landingPageSlug,
  })

  return <div>toto</div>
}
