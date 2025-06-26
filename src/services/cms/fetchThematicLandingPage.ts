import type { PopulatedThematicLandingPageType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig from '@/i18nConfig'

type ThematicLandingPage = PopulatedThematicLandingPageType<
  | 'faq'
  | 'articlesBlockArticles'
  | 'heroImage'
  | 'secondBlockImage'
  | 'actionsBlockImage'
  | 'thirdBlockList'
  | 'carouselItems'
  | 'actionsBlockList'
  | 'seventhBlockList'
>

export async function fetchThematicLandingPage({
  landingPageSlug,
}: {
  landingPageSlug: string
}): Promise<
  | {
      thematicLandingPage?: ThematicLandingPage
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
      'populate[4]': 'articlesBlockArticles.image',
      'populate[5]': 'thirdBlockList',
      'populate[6]': 'carouselItems',
      'populate[7]': 'actionsBlockList',
      'populate[8]': 'seventhBlockList',
      'populate[9]': 'thirdBlockList.icon',
      'populate[10]': 'seventhBlockList.icon',
      'populate[11]': 'carouselItems.icon',
      'populate[12]': 'articlesBlockArticles.category',
      'populate[13]': 'heroImage',
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
    return {}
  }
}
