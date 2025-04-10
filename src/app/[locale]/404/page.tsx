import Route404 from '@/components/layout/404'
import Main from '@/design-system/layout/Main'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'

export const generateMetadata = getCommonMetadata({
  title: t('404 - Nos Gestes Climat'),
  description: t(
    "Oups, vous êtes bien sur Nos Gestes Climat, mais cette page n'existe pas."
  ),
  alternates: {
    canonical: '/404',
  },
})

export default function NotFoundCatchAll() {
  return (
    <Main>
      <Route404 />
    </Main>
  )
}
