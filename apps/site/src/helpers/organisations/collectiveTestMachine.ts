import type { AuthenticatedUser } from '@/components/authentication/types'
import type { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import type { SubmissionError } from '@/services/organisations/submission-errors'

export type CollectiveTestStep =
  | 'informations'
  | 'mode'
  | 'authentification'
  | 'organisation'
  | 'finaliser'
  | 'done'

export type PollMode = 'standard' | 'scolaire'

export interface OrgaFormData {
  name: string
  organisationType: OrganisationTypeEnum
  administratorFirstName: string
  administratorLastName: string
  administratorPosition: string
}

export type CurrentOrga =
  | { status: 'loading' }
  | { status: 'none' }
  | { status: 'found'; org: { slug: string; name: string } }

export interface CollectiveTestState {
  isAuth: boolean
  currentOrga: CurrentOrga
  pollDraft: {
    name?: string
    mode?: PollMode
    expectedNumberOfParticipants?: number
  }
  orgaDraft: Partial<OrgaFormData> | null
  submission: {
    status: 'idle' | 'pending' | 'success' | 'error'
    pollId?: string
    pollSlug?: string
    orgSlug?: string
    reason?: SubmissionError
  }
}

export type CollectiveTestEvent =
  | {
      type: 'POLL_NAME_SET'
      name: string
      expectedNumberOfParticipants?: number
    }
  | { type: 'POLL_MODE_SET'; mode: PollMode }
  | { type: 'AUTH_COMPLETED'; user: AuthenticatedUser }
  | {
      type: 'ORG_STATUS_FETCHED'
      hasOrg: boolean
      orgSlug?: string
      orgName?: string
    }
  | { type: 'ORGA_DRAFT_UPDATED'; draft: Partial<OrgaFormData> }
  | { type: 'SUBMISSION_STARTED' }
  | {
      type: 'SUBMISSION_SUCCEEDED'
      pollId: string
      pollSlug: string
      orgSlug: string
    }
  | { type: 'SUBMISSION_FAILED'; reason: SubmissionError }
  | {
      type: 'HYDRATE'
      pollDraft: CollectiveTestState['pollDraft']
      orgaDraft: Partial<OrgaFormData> | null
    }
  | { type: 'RESET' }

export const initialCollectiveTestState: CollectiveTestState = {
  isAuth: false,
  currentOrga: { status: 'loading' },
  pollDraft: {},
  orgaDraft: null,
  submission: { status: 'idle' },
}

export function createInitialCollectiveTestState(options: {
  isAuth: boolean
  hasOrg: boolean
  orgSlug?: string
  orgName?: string
}): CollectiveTestState {
  const { isAuth, hasOrg, orgSlug, orgName } = options

  return {
    isAuth,
    currentOrga: isAuth
      ? hasOrg
        ? { status: 'found', org: { slug: orgSlug ?? '', name: orgName ?? '' } }
        : { status: 'none' }
      : { status: 'loading' },
    pollDraft: {},
    orgaDraft: null,
    submission: { status: 'idle' },
  }
}

export function currentCollectiveTestStep(
  state: CollectiveTestState
): CollectiveTestStep {
  if (!state.pollDraft.name?.trim()) {
    return 'informations'
  }

  if (!state.pollDraft.mode) {
    return 'mode'
  }

  if (!state.isAuth) {
    return 'authentification'
  }

  if (state.currentOrga.status === 'loading') {
    return 'authentification'
  }

  if (state.currentOrga.status !== 'found') {
    return 'organisation'
  }

  if (state.submission.status !== 'success') {
    return 'finaliser'
  }

  return 'done'
}

export function getCollectiveTestSteps(
  state: CollectiveTestState
): CollectiveTestStep[] {
  const steps: CollectiveTestStep[] = ['informations', 'mode']

  if (!state.isAuth) {
    steps.push('authentification', 'organisation', 'finaliser')
  } else if (state.currentOrga.status === 'found') {
    steps.push('finaliser')
  } else if (state.currentOrga.status === 'none') {
    steps.push('organisation', 'finaliser')
  } else {
    steps.push('authentification', 'organisation', 'finaliser')
  }

  return steps
}

export function getCollectiveTestStepNumber(
  step: CollectiveTestStep,
  state: CollectiveTestState
): number {
  return getCollectiveTestSteps(state).indexOf(step) + 1
}

export function getCollectiveTestTotalSteps(
  state: CollectiveTestState
): number {
  return getCollectiveTestSteps(state).length
}

export function collectiveTestReducer(
  state: CollectiveTestState,
  event: CollectiveTestEvent
): CollectiveTestState {
  switch (event.type) {
    case 'HYDRATE':
      return {
        ...state,
        pollDraft: event.pollDraft,
        orgaDraft: event.orgaDraft,
      }

    case 'RESET':
      return {
        ...initialCollectiveTestState,
        isAuth: state.isAuth,
        currentOrga: state.currentOrga,
      }

    case 'POLL_NAME_SET':
      return {
        ...state,
        pollDraft: {
          ...state.pollDraft,
          name: event.name,
          expectedNumberOfParticipants: event.expectedNumberOfParticipants,
        },
      }

    case 'POLL_MODE_SET':
      return { ...state, pollDraft: { ...state.pollDraft, mode: event.mode } }

    case 'AUTH_COMPLETED':
      return { ...state, isAuth: true, currentOrga: { status: 'loading' } }

    case 'ORG_STATUS_FETCHED':
      return {
        ...state,
        currentOrga: event.hasOrg
          ? {
              status: 'found',
              org: {
                slug: event.orgSlug ?? '',
                name: event.orgName ?? '',
              },
            }
          : { status: 'none' },
      }

    case 'ORGA_DRAFT_UPDATED':
      return {
        ...state,
        orgaDraft: { ...state.orgaDraft, ...event.draft },
      }

    case 'SUBMISSION_STARTED':
      if (state.submission.status === 'pending') {
        return state
      }
      return { ...state, submission: { status: 'pending' } }

    case 'SUBMISSION_SUCCEEDED':
      return {
        ...state,
        submission: {
          status: 'success',
          pollId: event.pollId,
          pollSlug: event.pollSlug,
          orgSlug: event.orgSlug,
        },
      }

    case 'SUBMISSION_FAILED':
      return {
        ...state,
        submission: { status: 'error', reason: event.reason },
      }

    default:
      return state
  }
}
