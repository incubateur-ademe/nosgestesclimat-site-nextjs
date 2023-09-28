import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ActionPageContent from './_components/ActionPageContent'

export function generateMetadata() {
  return getMetadataObject({
    title:
      "Actions, suite à votre simulation d'empreinte climat - Nos Gestes Climat",
    description:
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.',
  })
}

export default function ActionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  ;<ActionPageContent searchParams={searchParams} />
}
