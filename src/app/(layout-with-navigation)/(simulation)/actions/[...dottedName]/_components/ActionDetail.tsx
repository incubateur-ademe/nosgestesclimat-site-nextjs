'use client'

import Trans from '@/components/translation/Trans'
import { getMatomoEventActionAccepted } from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import Markdown from '@/design-system/utils/Markdown'
import {
  FormProvider,
  useEngine,
  useRule,
  useTempEngine,
  useUser,
} from '@/publicodes-state'
import { NGCRuleNode } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { utils } from 'publicodes'
import ActionForm from '../../_components/actions/_components/ActionForm'
import { filterRelevantMissingVariables } from '../../_helpers/filterRelevantMissingVariables'

const { decodeRuleName, encodeRuleName } = utils

export default function ActionDetail({
  params,
}: {
  params: { dottedName: string[] }
}) {
  const pathParamsDottedName = params?.dottedName

  const formattedDottedName = pathParamsDottedName
    ?.map(decodeURIComponent)
    ?.join(' . ')

  const { getValue } = useEngine()
  const { rules, getRuleObject } = useTempEngine()

  const { getCurrentSimulation, toggleActionChoice } = useUser()

  const dottedName = decodeRuleName(formattedDottedName ?? '')

  const nbRemainingQuestions = filterRelevantMissingVariables(
    Object.keys(getRuleObject(dottedName).missingVariables || {})
  )?.length

  const rule = useRule(dottedName)

  const currentSimulation = getCurrentSimulation()

  if (!currentSimulation) return

  const actionChoices = currentSimulation.actionChoices

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
              category={dottedName.split(' . ')[0]}
              onComplete={() => {
                toggleActionChoice(dottedName)

                if (!actionChoices[dottedName]) {
                  trackEvent(
                    getMatomoEventActionAccepted(
                      dottedName,
                      String(getValue(dottedName))
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
