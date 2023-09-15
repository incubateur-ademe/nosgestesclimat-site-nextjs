'use client'

import Meta from '@/components/misc/Meta'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Markdown from '@/design-system/utils/Markdown'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import { NGCRule } from '@/publicodes-state/types'
import { NGCRules } from '@/types/model'
import { usePathname } from 'next/navigation'
import { utils } from 'publicodes'
import { useFetchDocumentation } from '../../_hooks/useFetchDocumentation'

export default function ActionPlus() {
  const { t } = useClientTranslation()
  const encodedName = usePathname().replace('/actions/plus/', '')

  const dottedName: string = utils.decodeRuleName(decodeURI(encodedName))

  const locale = useLocale()
  const { user } = useUser()

  const { data: rules } = useRules({
    region: user.region.code,
    lang: locale || 'fr',
  })

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

        <ButtonLink size="sm" href={'/actions/' + encodedName}>
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
