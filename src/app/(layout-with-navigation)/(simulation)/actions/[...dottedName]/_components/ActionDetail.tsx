'use client'

import Trans from '@/components/translation/Trans'
import { actionsClickYes } from '@/constants/tracking/pages/actions'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import Markdown from '@/design-system/utils/Markdown'
import {
  FormProvider,
  useCurrentSimulation,
  useEngine,
  useRule,
  useTempEngine,
  useUser,
} from '@/publicodes-state'
import { DottedName, NGCRuleNode } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { utils } from 'publicodes'
import ActionForm from '../../_components/actions/_components/ActionForm'
import { filterRelevantMissingVariables } from '../../_helpers/filterRelevantMissingVariables'

const { decodeRuleName, encodeRuleName } = utils

export default function ActionDetail({
  params,
}: {
  params: { dottedName: DottedName[] }
}) {
  const { getCategory } = useEngine()
  const pathParamsDottedName = params?.dottedName

  const formattedDottedName = pathParamsDottedName
    ?.map(decodeURIComponent)
    ?.join(' . ')

  const { rules, getRuleObject, extendedFoldedSteps } = useTempEngine()

  const { toggleActionChoice } = useUser()

  const { actionChoices } = useCurrentSimulation()

  const dottedName = decodeRuleName(formattedDottedName ?? '')

  const remainingQuestions = filterRelevantMissingVariables(
    Object.keys(getRuleObject(dottedName).missingVariables || {}),
    extendedFoldedSteps
  )

  const nbRemainingQuestions = remainingQuestions?.length
  const rule = useRule(dottedName)

  if (!rules) {
    return null
  }

  const { title } = rule

  const { description, icônes: icons } = rules[dottedName]

  const flatActions = rules['actions']

  const relatedActions: NGCRuleNode[] = flatActions?.formule?.somme
    .filter(
      (action: DottedName) =>
        action !== dottedName && getCategory(dottedName) === getCategory(action)
    )
    .map((name: string) => getRuleObject(name))

  return (
    <>
      <Card className="mt-4">
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
              <Trans>Comprendre le calcul</Trans>
            </ButtonLink>
          </div>
        </div>
      </Card>

      {nbRemainingQuestions > 0 && (
        <>
          <h3 className="mt-4">
            <Trans>Personnalisez cette estimation</Trans>
          </h3>

          <FormProvider root={dottedName}>
            <ActionForm
              key={dottedName}
              category={getCategory(dottedName)}
              onComplete={() => {
                toggleActionChoice(dottedName)

                if (!actionChoices[dottedName]) {
                  trackEvent(actionsClickYes(dottedName))
                }
              }}
            />
          </FormProvider>
        </>
      )}

      {relatedActions && (
        <div className="mt-8">
          <h3>
            <Trans>Sur le même sujet</Trans>
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
    </>
  )
}
