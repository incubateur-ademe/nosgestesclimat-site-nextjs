'use client'

import Meta from '@/components/misc/Meta'
import TransClient from '@/components/translation/TransClient'
import { getMatomoEventActionAccepted } from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useRule, useTempEngine, useUser } from '@/publicodes-state'
import FormProvider from '@/publicodes-state/formProvider'
import { NGCRuleNode } from '@/types/model'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { utils } from 'publicodes'
import ActionForm from '../_components/actions/_components/ActionForm'
import { filterRelevantMissingVariables } from '../_helpers/filterRelevantMissingVariables'

const { decodeRuleName, encodeRuleName } = utils

export default function ActionDetailPage({
  params,
}: {
  params: { dottedName: string[] }
}) {
  const pathParamsDottedName = params?.dottedName

  const formattedDottedName = pathParamsDottedName
    ?.map(decodeURIComponent)
    ?.join(' . ')

  const { t } = useClientTranslation()

  const { getValue } = useEngine()
  const { rules, getRuleObject } = useTempEngine()

  const { getCurrentSimulation, toggleActionChoice } = useUser()

  const { actionChoices } = getCurrentSimulation()

  const dottedName = decodeRuleName(formattedDottedName ?? '')

  const nbRemainingQuestions = filterRelevantMissingVariables(
    Object.keys(getRuleObject(dottedName).missingVariables || {})
  )?.length

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
    .map((name: string) => getRuleObject(name))

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
            {icons && <span className="flex">{icons}</span>}
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

      {nbRemainingQuestions > 0 && (
        <>
          <h3 className="mt-4">
            <TransClient>Personnalisez cette estimation</TransClient>
          </h3>

          <FormProvider root={dottedName} categoryOrder={[]}>
            <ActionForm
              key={dottedName}
              category={dottedName.split(' . ')[0]}
              onComplete={() => {
                toggleActionChoice(dottedName)

                if (!actionChoices[dottedName]) {
                  trackEvent(
                    getMatomoEventActionAccepted(
                      dottedName,
                      getValue(dottedName)
                    )
                  )
                }
              }}
            />
          </FormProvider>
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
