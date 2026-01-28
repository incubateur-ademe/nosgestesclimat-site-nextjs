import ContentNarrow from '@/components/layout/ContentNarrow'
import Footer from '@/components/layout/Footer'
import FooterClientShell from '@/components/layout/FooterClientShell'
import type { Locale } from '@/i18nConfig'

export default async function NarrowLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  return (
    <>
      <ContentNarrow>{children}</ContentNarrow>

      <FooterClientShell>
        <Footer locale={locale as Locale} />
      </FooterClientShell>
    </>
  )
}
