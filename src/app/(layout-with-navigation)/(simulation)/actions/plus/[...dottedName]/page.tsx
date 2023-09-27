'use client'

import Meta from '@/components/misc/MetaOpenGraph'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Markdown from '@/design-system/utils/Markdown'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useTempEngine } from '@/publicodes-state'
import { NGCRule, NGCRules } from '@/publicodes-state/types'

import { utils } from 'publicodes'
import { useFetchDocumentation } from '../../_hooks/useFetchDocumentation'

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
      <Meta
        title={getRuleTitle(
          rule as NGCRule & { dottedName: string; titre: string }
        )}
        description={t('En savoir plus sur cette action.')}
      />

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
