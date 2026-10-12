import type Engine from 'publicodes'
import { toError } from '../../../lib/to-error.ts'
import type { Logger } from '../../logger/index.ts'
import { ActionAssessmentPublicodesError } from '../errors/action-assessment.error.ts'
import {
  buildRuleIdToDottedName,
  evaluateAction,
  toNewActionAssessment,
} from '../helpers/action-assessment.ts'
import { createActionAssessments } from '../repositories/action-assessments.repository.ts'
import { findActionRuleIds } from '../repositories/actions.repository.ts'
import type { NewActionAssessment } from '../types/action.ts'

interface AssessActionsDeps {
  logger: Logger
}

export function createAssessActions(deps: AssessActionsDeps) {
  return async function assessActions(
    engine: Engine,
    simulationId: string
  ): Promise<void> {
    const logger = deps.logger.child({
      scope: 'core.service.assessActions',
      simulationId: simulationId,
    })
    const actions = await findActionRuleIds()

    if (actions.length === 0) {
      throw new ActionAssessmentPublicodesError({
        message: 'No actions found in database. Cannot assess actions.',
      })
    }

    const ruleIdToDottedName = buildRuleIdToDottedName(engine)

    if (ruleIdToDottedName.size === 0) {
      throw new ActionAssessmentPublicodesError({
        message:
          'No publicodes rules have meta.id, cannot link actions to dotted names. ' +
          'Ensure the model includes meta.id on action rules.',
      })
    }

    const assessments: NewActionAssessment[] = actions
      .map(({ id, ruleId }) => {
        const dottedName = ruleIdToDottedName.get(ruleId)
        if (!dottedName) {
          logger.warn('No rule found with this id', {
            actionId: id,
            ruleId: ruleId,
          })
          return undefined
        }

        try {
          const evaluation = evaluateAction({ engine, dottedName })

          if (evaluation.outcome === 'unexpected_node_value') {
            logger.warn(
              `Unexpected nodeValue type: ${evaluation.nodeValueType}`,
              {
                actionId: id,
                ruleId: ruleId,
                dottedName: dottedName,
              }
            )
            return undefined
          }

          return toNewActionAssessment(
            { simulationId, actionId: id },
            evaluation.applicability
          )
        } catch (error) {
          // The action is skipped, never retried: the failure is captured, so
          // a rule the engine chokes on does not vanish with its assessment.
          logger.error(toError(error), {
            actionId: id,
            ruleId: ruleId,
            dottedName: dottedName,
          })
          return undefined
        }
      })
      .filter((a) => a !== undefined)

    if (assessments.length > 0) {
      await createActionAssessments(assessments)
    }
  }
}
