import Route404 from '@/components/layout/404'
import Main from '@/design-system/layout/Main'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const { t } = await getServerTranslation(locale)

  return {
    title: t('404 - Nos Gestes Climat'),
    description: t(
      "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas."
    ),
    alternates: {
      canonical: '/404',
    },
  }
}

export default function NotFound() {
  return (
    <>
      <Main>
        <Route404 />
      </Main>
    </>
  )
}
