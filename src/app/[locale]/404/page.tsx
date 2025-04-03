import Route404 from '@/components/layout/404'
import Header from '@/components/layout/Header'
import Main from '@/design-system/layout/Main'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DefaultPageProps } from '@/types'

export async function generateMetadata(props: DefaultPageProps) {
  const { locale } = await props.params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('404 - Nos Gestes Climat'),
    description: t(
      "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas."
    ),
    alternates: {
      canonical: '/404',
    },
  })
}

export default function NotFoundCatchAll() {
  return (
    <>
      <Header />
      <Main>
        <Route404 />
      </Main>
    </>
  )
}
