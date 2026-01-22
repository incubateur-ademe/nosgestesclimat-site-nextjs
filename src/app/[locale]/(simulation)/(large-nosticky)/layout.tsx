import ContentLarge from '@/components/layout/ContentLarge'
import HeaderServer from '@/components/layout/HeaderServer'

export default async function Layout({
  children,
  params,
}: LayoutProps<'/[locale]/fin' | '/[locale]/partage'>) {
  const { locale } = await params

  return (
    <>
      <HeaderServer locale={locale} isSticky={false} />
      <ContentLarge className="px-4 lg:px-0">{children}</ContentLarge>
    </>
  )
}
