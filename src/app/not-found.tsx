import Route404 from '@/components/layout/404'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

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
  return <Route404 />
}
