import ContentLarge from '@/components/layout/ContentLarge'
import HeaderServer from '@/components/layout/HeaderServer'
import type { DefaultPageProps } from '@/types'

export default async function MonEspacePage({ params }: DefaultPageProps) {
  const { locale } = await params

  return (
    <>
      <HeaderServer locale={locale} />

      <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">🚧 Mon Espace</h1>
        </div>
      </ContentLarge>
    </>
  )
}
