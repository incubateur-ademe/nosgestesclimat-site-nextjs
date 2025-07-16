import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Notification from '../question/Notification'

// Mock the publicodes-state hooks
const mockSetValue = vi.fn()
const mockUseRule = vi.fn()
const mockUseFormState = vi.fn()

vi.mock('@/publicodes-state', () => ({
  useRule: () => mockUseRule(),
  useFormState: () => mockUseFormState(),
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}))

// Mock the category color helpers
vi.mock('@/helpers/getCategoryColorClass', () => ({
  getBgCategoryColor: vi.fn(() => 'bg-test-100'),
  getBorderCategoryColor: vi.fn(() => 'border-test-200'),
  getTextCategoryColor: vi.fn(() => 'text-test-700'),
}))

// Mock the Markdown component
vi.mock('@/design-system/utils/Markdown', () => ({
  default: ({
    children,
    className,
  }: {
    children: string
    className: string
  }) => (
    <div data-testid="markdown" className={className}>
      {children}
    </div>
  ),
}))

// Mock the Button component
vi.mock('@/design-system/buttons/Button', () => ({
  default: ({ children, onClick, size, color }: any) => (
    <button
      data-testid="notification-button"
      onClick={onClick}
      data-size={size}
      data-color={color}>
      {children}
    </button>
  ),
}))

describe('Notification', () => {
  const mockNotification = 'test.notification' as DottedName
  const mockCurrentQuestion = 'test.question' as DottedName

  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock implementations
    mockUseRule.mockReturnValue({
      description: 'Test notification description',
      setValue: mockSetValue,
    })

    mockUseFormState.mockReturnValue({
      currentCategory: 'test-category',
    })
  })

  it('should render notification with description and button', () => {
    render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    expect(screen.getByTestId('motion-div')).toBeInTheDocument()
    expect(screen.getByTestId('markdown')).toBeInTheDocument()
    expect(screen.getByTestId('markdown')).toHaveTextContent(
      'Test notification description'
    )
    expect(screen.getByTestId('notification-button')).toBeInTheDocument()
    expect(screen.getByTestId('notification-button')).toHaveTextContent(
      "J'ai compris"
    )
  })

  it('should not render when description is empty', () => {
    mockUseRule.mockReturnValue({
      description: '',
      setValue: mockSetValue,
    })

    const { container } = render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should not render when description is undefined', () => {
    mockUseRule.mockReturnValue({
      description: undefined,
      setValue: mockSetValue,
    })

    const { container } = render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should call setValue with false when button is clicked', () => {
    render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    const button = screen.getByTestId('notification-button')
    fireEvent.click(button)

    expect(mockSetValue).toHaveBeenCalledWith(false, {})
  })

  it('should close notification when question changes', async () => {
    const { rerender } = render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    // Change the current question
    rerender(
      <Notification
        notification={mockNotification}
        currentQuestion={'different.question' as DottedName}
      />
    )

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledWith(false, {})
    })
  })

  it('should not close notification on initial render', () => {
    render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    expect(mockSetValue).not.toHaveBeenCalled()
  })

  it('should not close notification when currentQuestion is undefined initially', () => {
    render(
      <Notification
        notification={mockNotification}
        currentQuestion={undefined}
      />
    )

    expect(mockSetValue).not.toHaveBeenCalled()
  })

  it('should close notification when question changes from defined to different defined', async () => {
    const { rerender } = render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    // Change to a different defined question
    rerender(
      <Notification
        notification={mockNotification}
        currentQuestion={'different.question' as DottedName}
      />
    )

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledWith(false, {})
    })
  })

  it('should handle multiple question changes correctly', async () => {
    const { rerender } = render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    // First change
    rerender(
      <Notification
        notification={mockNotification}
        currentQuestion={'question1' as DottedName}
      />
    )

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledTimes(1)
    })

    // Second change
    rerender(
      <Notification
        notification={mockNotification}
        currentQuestion={'question2' as DottedName}
      />
    )

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledTimes(2)
    })
  })

  it('should render with complex markdown content', () => {
    const complexDescription =
      '**Bold text** and *italic text* with [link](https://example.com)'

    mockUseRule.mockReturnValue({
      description: complexDescription,
      setValue: mockSetValue,
    })

    render(
      <Notification
        notification={mockNotification}
        currentQuestion={mockCurrentQuestion}
      />
    )

    expect(screen.getByTestId('markdown')).toHaveTextContent(complexDescription)
  })

  it('should handle empty currentQuestion prop', () => {
    render(
      <Notification
        notification={mockNotification}
        currentQuestion={undefined}
      />
    )

    expect(screen.getByTestId('motion-div')).toBeInTheDocument()
    expect(screen.getByTestId('notification-button')).toBeInTheDocument()
  })
})
