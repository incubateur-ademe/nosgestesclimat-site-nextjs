import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'

import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import CategoryGuide from './_components/CategoryGuide'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Le guide - Nos Gestes Climat',
    description:
      'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.',
  })
}

export default function CategoryGuidePage({
  params: { category },
}: {
  params: { category: string }
}) {
  return (
    <div className="mx-auto my-4 flex flex-col items-start justify-center">
      <ButtonLink color="text" href="/guide">
        <span className="mr-2 inline-block">◀</span>
        <Trans>Retour</Trans>
      </ButtonLink>

      <CategoryGuide category={category} />
    </div>
  )
}
