import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import TallyForm from './TallyForm'

jest.mock('@/hooks/useClientTranslation', () => ({
  useClientTranslation: () => ({
    t: (key: string) => key,
  }),
}))

jest.mock('@/publicodes-state', () => ({
  useUser: jest.fn(),
}))

jest.mock('@/hooks/useLocale', () => ({
  useLocale: jest.fn(),
}))

describe('<TallyForm />', () => {
  const mockTally = {
    openPopup: jest.fn(),
  }

  beforeEach(() => {
    jest.useFakeTimers()
    window.Tally = mockTally
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it('should render a button with wave emoji', () => {
    // Given
    ;(useUser as jest.Mock).mockReturnValue({
      simulations: [],
    })
    ;(useLocale as jest.Mock).mockReturnValue('fr')

    // When
    render(<TallyForm />)

    // Then
    const button = screen.getByTestId('wave-button')
    expect(button).toBeInTheDocument()

    const emoji = screen.getByLabelText('Emoji main qui salue')
    expect(emoji).toBeInTheDocument()
    expect(emoji.textContent).toBe('👋')
  })

  it('should open Tally popup after timeout for new users', () => {
    // Given
    ;(useUser as jest.Mock).mockReturnValue({
      simulations: ['simulation1'],
    })
    ;(useLocale as jest.Mock).mockReturnValue('fr')

    // When
    render(<TallyForm />)
    act(() => {
      jest.advanceTimersByTime(5100)
    })

    // Then
    expect(mockTally.openPopup).toHaveBeenCalled()
  })

  it('should not open Tally popup for users with multiple simulations', () => {
    // Given
    ;(useUser as jest.Mock).mockReturnValue({
      simulations: ['simulation1', 'simulation2'],
    })
    ;(useLocale as jest.Mock).mockReturnValue('fr')

    // When
    render(<TallyForm />)
    act(() => {
      jest.advanceTimersByTime(5100)
    })

    // Then
    expect(mockTally.openPopup).not.toHaveBeenCalled()
  })

  it('should render nothing when locale is not fr', () => {
    // Given
    ;(useUser as jest.Mock).mockReturnValue({
      simulations: [],
    })
    ;(useLocale as jest.Mock).mockReturnValue('en')

    // When
    const { container } = render(<TallyForm />)

    // Then
    expect(container).toBeEmptyDOMElement()
  })
})
