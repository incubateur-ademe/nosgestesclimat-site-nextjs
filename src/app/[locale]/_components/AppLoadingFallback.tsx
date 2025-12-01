import ContentLarge from '@/components/layout/ContentLarge'
import HeaderServer from '@/components/layout/HeaderServer'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import type { Locale } from '@/i18nConfig'

export default function AppLoadingFallback({ locale }: { locale: Locale }) {
  return (
    <>
      <HeaderServer locale={locale} />
      <ContentLarge>
        <BlockSkeleton className="mt-10" />
      </ContentLarge>
    </>
  )
}
