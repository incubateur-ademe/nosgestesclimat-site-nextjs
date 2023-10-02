'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { handleFetchDocumentation } from '@/helpers/fetchDocumentation'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { NGCRule } from '@/publicodes-state/types'
import { utils } from 'publicodes'
import { use } from 'react'
import { getCategoryContent } from '../../_helpers/getCategoryContent'

export default function CategoryGuide({ category }: { category: string }) {
  const Content = getCategoryContent(category as string)

  const documentationData: { [key: string]: string } = use(
    handleFetchDocumentation
  )

  const actionsPlus = Object.entries(documentationData)
    .filter(([key]) => key.startsWith('actions-plus/'))
    .map(([key, value]) => ({
      plus: value,
      dottedName: key.replace('actions-plus/', ''),
    }))

  const relatedActions = actionsPlus.filter(
    (action) => category === action.dottedName.split(' . ')[0]
  )

  if (!Content) return null

  return (
    <>
      <Content />

      <h2>
        <Trans>Pour aller plus loin</Trans>:
      </h2>
      <div>
        {relatedActions.map((action) => (
          <ButtonLink
            key={action.dottedName}
            color="secondary"
            size="sm"
            href={'/actions/plus/' + utils.encodeRuleName(action.dottedName)}>
            {getRuleTitle(
              action as unknown as NGCRule & {
                dottedName: string
                titre: string
              }
            )}
          </ButtonLink>
        ))}
      </div>
    </>
  )
}
