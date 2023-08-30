'use client'

import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { handleFetchDocumentation } from '@/helpers/fetchDocumentation'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { NGCRule } from '@/types/model'
import { useParams } from 'next/navigation'
import { utils } from 'publicodes'
import { use } from 'react'
import { getCategoryContent } from '../_helpers/getCategoryContent'

export default function GuideAlimentation() {
  const documentationData: { [key: string]: string } = use(
    handleFetchDocumentation
  )

  const { category } = useParams()

  const Content = getCategoryContent(category as string)

  if (!Content) return null

  const actionsPlus = Object.entries(documentationData)
    .filter(([key]) => key.startsWith('actions-plus/'))
    .map(([key, value]) => ({
      plus: value,
      dottedName: key.replace('actions-plus/', ''),
    }))

  const relatedActions = actionsPlus.filter(
    (action) => category === action.dottedName.split(' . ')[0]
  )

  return (
    <div className="mx-auto my-4 flex flex-col items-start justify-center">
      <ButtonLink color="text" href="/guide">
        <span className="mr-2 inline-block">◀</span>
        <TransClient>Retour</TransClient>
      </ButtonLink>

      <div>
        <Content />

        <h2>
          <TransClient>Pour aller plus loin</TransClient>:
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
      </div>
    </div>
  )
}
