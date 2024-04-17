import PasserTestBanner from '@/components/layout/PasserTestBanner'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DocumentationLanding from './_components/DocumentationLanding'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      "Documentation, votre simulateur d'empreinte carbone - Nos Gestes Climat"
    ),
    description: t(
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.'
    ),
    alternates: {
      canonical: '/documentation',
    },
  })
}

export default function Documentation() {
  return (
    <div className="w-full max-w-4xl p-4 md:mx-auto md:py-8">
      <PasserTestBanner />

      <DocumentationLanding />
    </div>
  )
}
