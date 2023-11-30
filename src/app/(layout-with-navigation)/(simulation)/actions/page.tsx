import { noIndexObject } from '@/constants/metadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ActionPageContent from './_components/ActionPageContent'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      'Actions : comment réduire votre empreinte climat ? - Nos Gestes Climat',
    description: 'Quelles sont les actions les plus efficaces ?',
    robots: noIndexObject,
  })
}

export default function ActionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <ActionPageContent searchParams={searchParams} />
}
