import { SubmissionError } from '@/services/organisations/submission-errors'
import { describe, expect, it } from 'vitest'
import type { CollectiveTestState } from '../collectiveTestMachine'
import {
  collectiveTestReducer,
  createInitialCollectiveTestState,
  currentCollectiveTestStep,
  getCollectiveTestStepNumber,
  getCollectiveTestSteps,
  getCollectiveTestTotalSteps,
} from '../collectiveTestMachine'

const stateWithName = (
  overrides: Partial<CollectiveTestState> = {}
): CollectiveTestState => ({
  ...createInitialCollectiveTestState({ isAuth: true, hasOrg: false }),
  pollDraft: { name: 'Mon test' },
  ...overrides,
})

describe('currentCollectiveTestStep', () => {
  it('returns informations while no poll name is set', () => {
    const state = createInitialCollectiveTestState({
      isAuth: false,
      hasOrg: false,
    })
    expect(currentCollectiveTestStep(state)).toBe('informations')
  })

  it('returns mode once the poll name is set but not the mode', () => {
    expect(currentCollectiveTestStep(stateWithName())).toBe('mode')
  })

  it('returns authentification for a non authenticated user', () => {
    const state = stateWithName({
      isAuth: false,
      currentOrga: { status: 'loading' },
      pollDraft: { name: 'Mon test', mode: 'standard' },
    })
    expect(currentCollectiveTestStep(state)).toBe('authentification')
  })

  it('returns authentification while the organisation is still loading', () => {
    const state = stateWithName({
      isAuth: true,
      currentOrga: { status: 'loading' },
      pollDraft: { name: 'Mon test', mode: 'standard' },
    })
    expect(currentCollectiveTestStep(state)).toBe('authentification')
  })

  it('returns organisation for an authenticated user without an organisation', () => {
    const state = stateWithName({
      pollDraft: { name: 'Mon test', mode: 'standard' },
    })
    expect(currentCollectiveTestStep(state)).toBe('organisation')
  })

  it('returns finaliser for an authenticated user with an organisation', () => {
    const state = stateWithName({
      currentOrga: { status: 'found', org: { slug: 'orga', name: 'Orga' } },
      pollDraft: { name: 'Mon test', mode: 'standard' },
    })
    expect(currentCollectiveTestStep(state)).toBe('finaliser')
  })

  it('returns done once the submission succeeded', () => {
    const state = stateWithName({
      currentOrga: { status: 'found', org: { slug: 'orga', name: 'Orga' } },
      pollDraft: { name: 'Mon test', mode: 'standard' },
      submission: {
        status: 'success',
        pollId: 'poll',
        pollSlug: 'poll',
        orgSlug: 'orga',
      },
    })
    expect(currentCollectiveTestStep(state)).toBe('done')
  })
})

describe('getCollectiveTestSteps', () => {
  it('counts 5 steps for a non authenticated user', () => {
    const state = createInitialCollectiveTestState({
      isAuth: false,
      hasOrg: false,
    })
    expect(getCollectiveTestSteps(state)).toEqual([
      'informations',
      'mode',
      'authentification',
      'organisation',
      'finaliser',
    ])
    expect(getCollectiveTestTotalSteps(state)).toBe(5)
  })

  it('counts 4 steps for an authenticated user without an organisation', () => {
    const state = createInitialCollectiveTestState({
      isAuth: true,
      hasOrg: false,
    })
    expect(getCollectiveTestSteps(state)).toEqual([
      'informations',
      'mode',
      'organisation',
      'finaliser',
    ])
    expect(getCollectiveTestTotalSteps(state)).toBe(4)
  })

  it('counts 3 steps for an authenticated user with an organisation', () => {
    const state = createInitialCollectiveTestState({
      isAuth: true,
      hasOrg: true,
      orgSlug: 'orga',
      orgName: 'Orga',
    })
    expect(getCollectiveTestSteps(state)).toEqual([
      'informations',
      'mode',
      'finaliser',
    ])
    expect(getCollectiveTestTotalSteps(state)).toBe(3)
  })

  it('numbers the mode step as 2 in every scenario', () => {
    const nonAuth = createInitialCollectiveTestState({
      isAuth: false,
      hasOrg: false,
    })
    const authNoOrga = createInitialCollectiveTestState({
      isAuth: true,
      hasOrg: false,
    })
    const authWithOrga = createInitialCollectiveTestState({
      isAuth: true,
      hasOrg: true,
      orgSlug: 'orga',
    })
    expect(getCollectiveTestStepNumber('mode', nonAuth)).toBe(2)
    expect(getCollectiveTestStepNumber('mode', authNoOrga)).toBe(2)
    expect(getCollectiveTestStepNumber('mode', authWithOrga)).toBe(2)
  })
})

describe('collectiveTestReducer', () => {
  it('sets the poll name and expected number of participants', () => {
    const state = collectiveTestReducer(
      createInitialCollectiveTestState({ isAuth: false, hasOrg: false }),
      {
        type: 'POLL_NAME_SET',
        name: 'Mon test',
        expectedNumberOfParticipants: 10,
      }
    )
    expect(state.pollDraft.name).toBe('Mon test')
    expect(state.pollDraft.expectedNumberOfParticipants).toBe(10)
  })

  it('sets the poll mode', () => {
    const state = collectiveTestReducer(stateWithName(), {
      type: 'POLL_MODE_SET',
      mode: 'scolaire',
    })
    expect(state.pollDraft.mode).toBe('scolaire')
  })

  it('marks the user as authenticated on AUTH_COMPLETED', () => {
    const state = collectiveTestReducer(
      createInitialCollectiveTestState({ isAuth: false, hasOrg: false }),
      { type: 'AUTH_COMPLETED', user: { email: 'a@b.c', userId: '1' } }
    )
    expect(state.isAuth).toBe(true)
    expect(state.currentOrga).toEqual({ status: 'loading' })
  })

  it('stores the fetched organisation status', () => {
    const state = collectiveTestReducer(
      createInitialCollectiveTestState({ isAuth: true, hasOrg: false }),
      {
        type: 'ORG_STATUS_FETCHED',
        hasOrg: true,
        orgSlug: 'orga',
        orgName: 'Orga',
      }
    )
    expect(state.currentOrga).toEqual({
      status: 'found',
      org: { slug: 'orga', name: 'Orga' },
    })
  })

  it('updates the organisation draft', () => {
    const state = collectiveTestReducer(
      createInitialCollectiveTestState({ isAuth: true, hasOrg: false }),
      { type: 'ORGA_DRAFT_UPDATED', draft: { name: 'Orga' } }
    )
    expect(state.orgaDraft).toEqual({ name: 'Orga' })
  })

  it('does not start a submission while already pending', () => {
    const pending = collectiveTestReducer(stateWithName(), {
      type: 'SUBMISSION_STARTED',
    })
    const again = collectiveTestReducer(pending, { type: 'SUBMISSION_STARTED' })
    expect(again.submission.status).toBe('pending')
  })

  it('stores the submission success', () => {
    const state = collectiveTestReducer(stateWithName(), {
      type: 'SUBMISSION_SUCCEEDED',
      pollId: 'poll',
      pollSlug: 'poll',
      orgSlug: 'orga',
    })
    expect(state.submission).toEqual({
      status: 'success',
      pollId: 'poll',
      pollSlug: 'poll',
      orgSlug: 'orga',
    })
  })

  it('stores the submission failure', () => {
    const reason = new SubmissionError()
    const state = collectiveTestReducer(stateWithName(), {
      type: 'SUBMISSION_FAILED',
      reason,
    })
    expect(state.submission.status).toBe('error')
    expect(state.submission.reason).toBe(reason)
  })

  it('restores drafts on HYDRATE while keeping the server state', () => {
    const state = collectiveTestReducer(
      createInitialCollectiveTestState({
        isAuth: true,
        hasOrg: true,
        orgSlug: 'orga',
      }),
      {
        type: 'HYDRATE',
        pollDraft: { name: 'Mon test', mode: 'standard' },
        orgaDraft: null,
      }
    )
    expect(state.pollDraft.name).toBe('Mon test')
    expect(state.isAuth).toBe(true)
    expect(state.currentOrga.status).toBe('found')
  })

  it('resets the flow while keeping the server state', () => {
    const state = collectiveTestReducer(
      createInitialCollectiveTestState({
        isAuth: true,
        hasOrg: true,
        orgSlug: 'orga',
      }),
      { type: 'RESET' }
    )
    expect(state.pollDraft).toEqual({})
    expect(state.submission.status).toBe('idle')
    expect(state.isAuth).toBe(true)
    expect(state.currentOrga.status).toBe('found')
  })
})
