import { describe, expect, it } from 'vitest'
import type { PersonalizedAction } from '../../types/action.ts'
import { buildActionPlan } from '../action-plan.ts'

const committedActionWithImpact = (impact: number | null): PersonalizedAction =>
  ({
    choice: { type: 'committed', chosenAt: new Date() },
    assessment: impact === null ? null : { applicable: true, impact },
  }) as PersonalizedAction

describe('buildActionPlan', () => {
  it('returns null when the user committed to no action', () => {
    expect(buildActionPlan([])).toBeNull()
  })

  it('summarizes a single committed action', () => {
    expect(buildActionPlan([committedActionWithImpact(1000)])).toEqual({
      numberOfCommittedActions: 1,
      totalImpact: 1000,
    })
  })

  it('sums the impacts of all committed actions', () => {
    expect(
      buildActionPlan([
        committedActionWithImpact(1000),
        committedActionWithImpact(500),
      ])
    ).toEqual({
      numberOfCommittedActions: 2,
      totalImpact: 1500,
    })
  })

  it('counts committed actions without assessment as 0 impact', () => {
    expect(
      buildActionPlan([
        committedActionWithImpact(1000),
        committedActionWithImpact(null),
      ])
    ).toEqual({
      numberOfCommittedActions: 2,
      totalImpact: 1000,
    })
  })
})
