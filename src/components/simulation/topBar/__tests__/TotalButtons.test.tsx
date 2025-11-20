import TotalButtons from '@/components/simulation/topBar/TotalButtons'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { useCurrentSimulation } from '@/publicodes-state'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Mock } from 'vitest'
import { vi } from 'vitest'

// Mock hooks
const mockUseDebug = vi.fn()
vi.mock('@/hooks/useDebug', () => ({
  useDebug: () => mockUseDebug(),
}))

const mockUseIframe = vi.fn()
vi.mock('@/hooks/useIframe', () => ({
  useIframe: () => mockUseIframe(),
}))

// We need to mock the whole module to spy on useCurrentSimulation
vi.mock('@/publicodes-state', async () => {
  const actual = await vi.importActual('@/publicodes-state')
  return {
    ...actual,
    useCurrentSimulation: vi.fn(),
  }
})

// Mock Icon components
vi.mock('@/components/icons/ListIcon', () => ({
  default: () => <svg data-testid="list-icon" />,
}))
vi.mock('@/components/icons/SaveCheckIcon', () => ({
  default: () => <svg data-testid="save-check-icon" />,
}))
vi.mock('@/components/icons/SaveIcon', () => ({
  default: () => <svg data-testid="save-icon" />,
}))

describe('TotalButtons', () => {
  const toggleQuestionList = vi.fn()
  const toggleSaveModal = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useCurrentSimulation as Mock).mockReturnValue({
      savedViaEmail: false,
    })
    mockUseIframe.mockReturnValue({
      isFrenchRegion: true,
    })
  })

  describe('Question list button', () => {
    it('should render the question list button if isDebug is true', () => {
      mockUseDebug.mockReturnValue(true)

      renderWithWrapper(
        <TotalButtons
          toggleQuestionList={toggleQuestionList}
          toggleSaveModal={toggleSaveModal}
        />
      )

      expect(screen.getByText('Liste des questions')).toBeInTheDocument()
      expect(screen.getByTestId('list-icon')).toBeInTheDocument()
    })

    it('should not render the question list button if isDebug is false', () => {
      mockUseDebug.mockReturnValue(false)

      renderWithWrapper(
        <TotalButtons toggleQuestionList={toggleQuestionList} />
      )

      expect(screen.queryByText('Liste des questions')).not.toBeInTheDocument()
    })

    it('should call toggleQuestionList when the button is clicked', async () => {
      mockUseDebug.mockReturnValue(true)

      renderWithWrapper(
        <TotalButtons
          toggleQuestionList={toggleQuestionList}
          toggleSaveModal={toggleSaveModal}
        />
      )

      const button = screen.getByText('Liste des questions')
      await userEvent.click(button)

      expect(toggleQuestionList).toHaveBeenCalledTimes(1)
    })
  })

  describe('Save button', () => {
    it('should render the save button if toggleSaveModal is provided', () => {
      mockUseDebug.mockReturnValue(false)

      renderWithWrapper(
        <TotalButtons
          toggleQuestionList={toggleQuestionList}
          toggleSaveModal={toggleSaveModal}
        />
      )

      expect(screen.getByText('Reprendre plus tard')).toBeInTheDocument()
    })

    it('should not render the save button if toggleSaveModal is not provided', () => {
      mockUseDebug.mockReturnValue(false)

      renderWithWrapper(
        <TotalButtons toggleQuestionList={toggleQuestionList} />
      )

      expect(screen.queryByText('Reprendre plus tard')).not.toBeInTheDocument()
    })

    it('should call toggleSaveModal when the save button is clicked', async () => {
      mockUseDebug.mockReturnValue(false)

      renderWithWrapper(
        <TotalButtons
          toggleQuestionList={toggleQuestionList}
          toggleSaveModal={toggleSaveModal}
        />
      )

      const button = screen.getByText('Reprendre plus tard')
      await userEvent.click(button)

      expect(toggleSaveModal).toHaveBeenCalledTimes(1)
    })

    it('should display SaveIcon when simulation is not saved via email', () => {
      mockUseDebug.mockReturnValue(false)
      ;(useCurrentSimulation as Mock).mockReturnValue({
        savedViaEmail: false,
      })

      renderWithWrapper(
        <TotalButtons
          toggleQuestionList={toggleQuestionList}
          toggleSaveModal={toggleSaveModal}
        />
      )

      expect(screen.getByTestId('save-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('save-check-icon')).not.toBeInTheDocument()
    })

    it('should display SaveCheckIcon when simulation is saved via email', () => {
      mockUseDebug.mockReturnValue(false)
      ;(useCurrentSimulation as Mock).mockReturnValue({
        savedViaEmail: true,
      })

      renderWithWrapper(
        <TotalButtons
          toggleQuestionList={toggleQuestionList}
          toggleSaveModal={toggleSaveModal}
        />
      )

      expect(screen.getByTestId('save-check-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('save-icon')).not.toBeInTheDocument()
    })
  })
})
