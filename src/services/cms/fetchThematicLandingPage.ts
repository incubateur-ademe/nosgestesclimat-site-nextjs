import type { PopulatedThematicLandingPageType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig from '@/i18nConfig'

type ThematicLandingPage = PopulatedThematicLandingPageType<
  | 'faq'
  | 'articlesBlockArticles'
  | 'heroImage'
  | 'secondBlockImage'
  | 'actionsBlockImage'
>

export async function fetchThematicLandingPage({
  landingPageSlug,
}: {
  landingPageSlug: string
}): Promise<
  | {
      thematicLandingPage?: ThematicLandingPage
      error?: boolean
    }
  | undefined
> {
  try {
    const thematicLPSearchParams = new URLSearchParams({
      locale: i18nConfig.defaultLocale,
      'populate[0]': 'faq',
      'populate[1]': 'articlesBlockArticles',
      'populate[2]': 'secondBlockImage',
      'populate[3]': 'actionsBlockImage',
      'filters[slug][$eq]': landingPageSlug,
      sort: 'publishedAt:desc',
    })

    const thematicLPResponse = await cmsClient<{
      data: [ThematicLandingPage]
    }>(`/api/landing-thematiques?${thematicLPSearchParams}`)

    if (thematicLPResponse.data?.length !== 1) {
      console.error(
        `Error: fetch thematic LP error for slug: ${landingPageSlug}`
      )
      return
    }

    const {
      data: [thematicLP],
    } = thematicLPResponse

    return {
      thematicLandingPage: thematicLP,
    }
  } catch (error) {
    return {
      thematicLandingPage: undefined,
      error: true,
    }
  }
}
