import type {
  OrgaFormData,
  PollMode,
} from '@/helpers/organisations/collectiveTestMachine'
import { safeSessionStorage } from '@/utils/browser/safeSessionStorage'
import { ORGA_DATA_KEY, POLL_DATA_KEY } from '../_constants/sessionStorage'

export interface PollDraftStorage {
  name?: string
  mode?: PollMode
  expectedNumberOfParticipants?: number
}

export interface CollectiveTestDrafts {
  pollDraft: PollDraftStorage
  orgaDraft: Partial<OrgaFormData> | null
}

function isValidPollDraft(data: unknown): data is PollDraftStorage {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const draft = data as Record<string, unknown>

  if (
    draft.name !== undefined &&
    (typeof draft.name !== 'string' || draft.name.trim() === '')
  ) {
    return false
  }

  if (
    draft.mode !== undefined &&
    draft.mode !== 'standard' &&
    draft.mode !== 'scolaire'
  ) {
    return false
  }

  if (
    draft.expectedNumberOfParticipants !== undefined &&
    draft.expectedNumberOfParticipants !== null &&
    typeof draft.expectedNumberOfParticipants !== 'number'
  ) {
    return false
  }

  return true
}

function isValidOrgaDraft(data: unknown): data is Partial<OrgaFormData> {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const draft = data as Record<string, unknown>

  return [
    'name',
    'organisationType',
    'administratorFirstName',
    'administratorLastName',
    'administratorPosition',
  ].every((key) => draft[key] === undefined || typeof draft[key] === 'string')
}

function readPollDraft(): PollDraftStorage {
  try {
    const raw = safeSessionStorage.getItem(POLL_DATA_KEY)

    if (!raw) {
      return {}
    }

    const parsed: unknown = JSON.parse(raw)

    if (!isValidPollDraft(parsed)) {
      safeSessionStorage.removeItem(POLL_DATA_KEY)
      return {}
    }

    return parsed
  } catch {
    return {}
  }
}

function readOrgaDraft(): Partial<OrgaFormData> | null {
  try {
    const raw = safeSessionStorage.getItem(ORGA_DATA_KEY)

    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)

    if (!isValidOrgaDraft(parsed)) {
      safeSessionStorage.removeItem(ORGA_DATA_KEY)
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function readCollectiveTestDrafts(): CollectiveTestDrafts {
  return {
    pollDraft: readPollDraft(),
    orgaDraft: readOrgaDraft(),
  }
}

export function writeCollectiveTestDrafts(drafts: CollectiveTestDrafts): void {
  safeSessionStorage.setItem(POLL_DATA_KEY, JSON.stringify(drafts.pollDraft))
  if (drafts.orgaDraft) {
    safeSessionStorage.setItem(ORGA_DATA_KEY, JSON.stringify(drafts.orgaDraft))
  } else {
    safeSessionStorage.removeItem(ORGA_DATA_KEY)
  }
}

export function clearCollectiveTestDrafts(): void {
  safeSessionStorage.removeItem(POLL_DATA_KEY)
  safeSessionStorage.removeItem(ORGA_DATA_KEY)
}
