'use client'

import Meta from '@/components/misc/Meta'
import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { NGCRuleNode } from '@/types/model'
import { useParams } from 'next/navigation'
import { utils } from 'publicodes'
import emoji from 'react-easy-emoji'
import Form from '../../../simulateur/[...dottedName]/_components/Form'

const { decodeRuleName, encodeRuleName } = utils

export default function Content() {
  const params = useParams()

  const pathParamsDottedName = params?.dottedName as string[]

  const formattedDottedName = pathParamsDottedName
    ?.map(decodeURIComponent)
    ?.join(' . ')

  const { t } = useClientTranslation()

  const { rules } = useEngine()
  const { remainingQuestions } = useForm()

  const dottedName = decodeRuleName(formattedDottedName ?? '')

  const rule = useRule(dottedName)

  const { title } = rule

  const { description, icônes: icons } = rules[dottedName]

  const flatActions = rules['actions']

  const relatedActions: NGCRuleNode[] = flatActions?.formule?.somme
    .filter(
      (actionDottedName: string) =>
        actionDottedName !== dottedName &&
        dottedName.split(' . ')[0] === actionDottedName.split(' . ')[0]
    )
    // eslint-disable-next-line react-hooks/rules-of-hooks
    .map((name: string) => useRule(name))

  return (
    <div className="mx-auto max-w-[600px]">
      <Meta
        title={t('Action') + ' : ' + title}
        description={description ?? ''}
      />
      <AutoCanonicalTag />

      <ButtonLink
        size="sm"
        color="text"
        href="/actions"
        className="flex items-center">
        <span
          role="img"
          className="pr-2 !text-[0.5rem]"
          aria-label="arrow pointing left">
          ◀
        </span>{' '}
        <TransClient> Retour à la liste</TransClient>
      </ButtonLink>

      <Card className="mt-4 flex-col">
        <header className="mb-4">
          <h2 className="flex items-center gap-2">
            {icons && <span className="flex">{emoji(icons)}</span>}
            {title}
          </h2>
        </header>
        <div>
          <Markdown>{description ?? ''}</Markdown>

          <div className="mt-8">
            <ButtonLink
              color="secondary"
              href={'/documentation/' + pathParamsDottedName?.join('/')}>
              <span
                role="img"
                aria-label="emoji book"
                aria-hidden
                className="mr-3 text-xl">
                📚
              </span>
              <TransClient>Comprendre le calcul</TransClient>
            </ButtonLink>
          </div>
        </div>
      </Card>

      {remainingQuestions.length > 0 && (
        <>
          <h3>
            <TransClient>Personnalisez cette estimation</TransClient>
          </h3>
          <Form />
        </>
      )}

      {relatedActions && (
        <div className="mt-8">
          <h3>
            <TransClient>Sur le même sujet</TransClient>
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedActions.map((action, index) => (
              <ButtonLink
                color="secondary"
                key={`relatedAction${index}`}
                href={'/actions/' + encodeRuleName(action.dottedName)}
                size="sm">
                {action.title}
              </ButtonLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
