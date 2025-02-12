import Route404 from '@/components/layout/404'
import Markdown from '@/design-system/utils/Markdown'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPost } from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      "Actions, suite à votre simulation d'empreinte climat - Nos Gestes Climat"
    ),
    description: t(
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.'
    ),
  })
}

type Props = {
  params: {
    dottedName: DottedName[]
  }
}

export default async function ActionPlus({
  params: { dottedName: dottedNameArray },
}: Props) {
  const action = await getPost(
    `src/locales/actions-plus/fr/`,
    decodeURI(dottedNameArray.join(' . ').replaceAll('-', ' '))
  )

  return (
    <div>{action ? <Markdown>{action?.content}</Markdown> : <Route404 />}</div>
  )
}
