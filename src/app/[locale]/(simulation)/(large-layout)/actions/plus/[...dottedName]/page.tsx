import Markdown from '@/design-system/utils/Markdown'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPost } from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DefaultPageProps } from '@/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { notFound } from 'next/navigation'
export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    title: t(
      "Actions, suite à votre simulation d'empreinte climat - Nos Gestes Climat"
    ),
    description: t(
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.'
    ),
    locale,
  })
}

export default async function ActionPlus({
  params,
}: DefaultPageProps<{ params: { dottedName: DottedName[] } }>) {
  const { dottedName: dottedNameArray } = await params

  const action = getPost(
    `src/locales/actions-plus/fr/`,
    decodeURI(dottedNameArray.join(' . ').replaceAll('-', ' '))
  )

  if (!action) {
    notFound()
  }

  return <Markdown>{action?.content}</Markdown>
}
