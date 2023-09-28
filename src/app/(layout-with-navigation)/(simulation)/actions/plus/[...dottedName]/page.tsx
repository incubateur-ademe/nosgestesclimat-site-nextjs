'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useTempEngine } from '@/publicodes-state'
import { NGCRules } from '@/publicodes-state/types'

import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { utils } from 'publicodes'
import { useFetchDocumentation } from '../../_hooks/useFetchDocumentation'

export function generateMetadata() {
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
  const { t } = useClientTranslation()

  const dottedName: string = utils.decodeRuleName(
    dottedNameArray.map(decodeURI).join(' . ')
  )

  const { rules } = useTempEngine()

  const { data: documentation } = useFetchDocumentation()

  if (!documentation) {
    return null
  }

  const rule = {
    ...(rules as NGCRules)[dottedName],
    dottedName,
    plus: documentation['actions-plus/' + dottedName],
  }

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

      <div>
        <Markdown>
          {rule.plus || t("Cette fiche détaillée n'existe pas encore")}
        </Markdown>
      </div>
    </div>
  )
}
