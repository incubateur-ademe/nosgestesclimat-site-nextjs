import { trackEvents } from '@/utils/analytics/trackEvent'

export const trackPostThumbnailClick = (slug: string) => {
  trackEvents(['trackEvent', 'blog', 'article', slug])
}
