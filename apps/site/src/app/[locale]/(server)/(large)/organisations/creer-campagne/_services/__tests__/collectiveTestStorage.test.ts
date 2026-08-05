import { safeSessionStorage } from '@/utils/browser/safeSessionStorage'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ORGA_DATA_KEY, POLL_DATA_KEY } from '../../_constants/sessionStorage'
import {
  clearCollectiveTestDrafts,
  readCollectiveTestDrafts,
  writeCollectiveTestDrafts,
} from '../collectiveTestStorage'

vi.mock('@/utils/browser/safeSessionStorage', () => ({
  safeSessionStorage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}))

const mockGetItem = vi.mocked(safeSessionStorage.getItem)
const mockSetItem = vi.mocked(safeSessionStorage.setItem)
const mockRemoveItem = vi.mocked(safeSessionStorage.removeItem)

describe('collectiveTestStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('readCollectiveTestDrafts', () => {
    it('returns empty drafts when nothing is stored', () => {
      mockGetItem.mockReturnValue(null)

      expect(readCollectiveTestDrafts()).toEqual({
        pollDraft: {},
        orgaDraft: null,
      })
    })

    it('restores the stored poll draft', () => {
      mockGetItem.mockImplementation((key) =>
        key === POLL_DATA_KEY
          ? JSON.stringify({ name: 'Mon test', mode: 'standard' })
          : null
      )

      expect(readCollectiveTestDrafts().pollDraft).toEqual({
        name: 'Mon test',
        mode: 'standard',
      })
    })

    it('restores the stored organisation draft', () => {
      mockGetItem.mockImplementation((key) =>
        key === ORGA_DATA_KEY
          ? JSON.stringify({ name: 'Orga', organisationType: 'association' })
          : null
      )

      expect(readCollectiveTestDrafts().orgaDraft).toEqual({
        name: 'Orga',
        organisationType: 'association',
      })
    })

    it('discards an invalid poll draft and clears it', () => {
      mockGetItem.mockImplementation((key) =>
        key === POLL_DATA_KEY ? JSON.stringify({ name: '', mode: 'foo' }) : null
      )

      expect(readCollectiveTestDrafts().pollDraft).toEqual({})
      expect(mockRemoveItem).toHaveBeenCalledWith(POLL_DATA_KEY)
    })

    it('discards an invalid organisation draft and clears it', () => {
      mockGetItem.mockImplementation((key) =>
        key === ORGA_DATA_KEY ? JSON.stringify({ name: 42 }) : null
      )

      expect(readCollectiveTestDrafts().orgaDraft).toBeNull()
      expect(mockRemoveItem).toHaveBeenCalledWith(ORGA_DATA_KEY)
    })
  })

  describe('writeCollectiveTestDrafts', () => {
    it('writes the poll draft and removes the organisation draft when null', () => {
      writeCollectiveTestDrafts({
        pollDraft: { name: 'Mon test' },
        orgaDraft: null,
      })

      expect(mockSetItem).toHaveBeenCalledWith(
        POLL_DATA_KEY,
        JSON.stringify({ name: 'Mon test' })
      )
      expect(mockRemoveItem).toHaveBeenCalledWith(ORGA_DATA_KEY)
    })

    it('writes both drafts when an organisation draft is provided', () => {
      writeCollectiveTestDrafts({
        pollDraft: { name: 'Mon test' },
        orgaDraft: { name: 'Orga' },
      })

      expect(mockSetItem).toHaveBeenCalledWith(
        ORGA_DATA_KEY,
        JSON.stringify({ name: 'Orga' })
      )
    })
  })

  describe('clearCollectiveTestDrafts', () => {
    it('removes both storage keys', () => {
      clearCollectiveTestDrafts()

      expect(mockRemoveItem).toHaveBeenCalledWith(POLL_DATA_KEY)
      expect(mockRemoveItem).toHaveBeenCalledWith(ORGA_DATA_KEY)
    })
  })
})
