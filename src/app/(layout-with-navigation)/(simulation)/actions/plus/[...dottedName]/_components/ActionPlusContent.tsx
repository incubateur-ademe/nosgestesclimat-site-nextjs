import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useTempEngine } from '@/publicodes-state'
import { NGCRules } from '@/publicodes-state/types'
import { utils } from 'publicodes'
import { useFetchDocumentation } from '../../../_hooks/useFetchDocumentation'

export default function ActionPlusContent({
  dottedNameArray,
}: {
  dottedNameArray: string[]
}) {
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
      <Markdown>
        {rule.plus || t("Cette fiche détaillée n'existe pas encore")}
      </Markdown>
    </div>
  )
}
