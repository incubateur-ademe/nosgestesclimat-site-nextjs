import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'

import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ActionPlusContent from './_components/ActionPlusContent'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Actions, suite à votre simulation d'empreinte climat - Nos Gestes Climat",
    description:
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.',
  })
}

type Props = {
  params: {
    dottedName: string[]
  }
}

export default function ActionPlus({
  params: { dottedName: dottedNameArray },
}: Props) {
  return (
    <div>
      <div className="mb-8 mt-4 flex flex-wrap gap-4">
        <ButtonLink size="sm" color="text" href={'/actions/plus'}>
          <Trans>◀ Retour à la liste des fiches</Trans>
        </ButtonLink>

        <ButtonLink size="sm" href={'/actions/' + dottedNameArray.join('/')}>
          <Trans>🧮 Voir le geste climat correspondant</Trans>
        </ButtonLink>
      </div>

      <ActionPlusContent dottedNameArray={dottedNameArray} />
    </div>
  )
}
