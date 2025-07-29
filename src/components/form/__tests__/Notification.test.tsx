import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { fireEvent, render, screen } from '@testing-library/react'
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

  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock implementations
    mockUseRule.mockReturnValue({
      description: 'Test notification description',
      setValue: mockSetValue,
    })

    mockUseFormState.mockReturnValue({
      currentQuestion: 'test-category',
    })
  })

  it('should render notification with description and button', () => {
    render(<Notification notification={mockNotification} />)

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
      <Notification notification={mockNotification} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should not render when description is undefined', () => {
    mockUseRule.mockReturnValue({
      description: undefined,
      setValue: mockSetValue,
    })

    const { container } = render(
      <Notification notification={mockNotification} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should not render when notification is empty', () => {
    const { container } = render(
      <Notification notification={'' as DottedName} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should call setValue with false when button is clicked', () => {
    render(<Notification notification={mockNotification} />)

    const button = screen.getByTestId('notification-button')
    fireEvent.click(button)

    expect(mockSetValue).toHaveBeenCalledWith(false)
  })

  it('should render with complex markdown content', () => {
    const complexDescription =
      '**Bold text** and *italic text* with [link](https://example.com)'

    mockUseRule.mockReturnValue({
      description: complexDescription,
      setValue: mockSetValue,
    })

    render(<Notification notification={mockNotification} />)

    expect(screen.getByTestId('markdown')).toHaveTextContent(complexDescription)
  })

  it('should handle notification prop as string', () => {
    render(<Notification notification={'string.notification' as DottedName} />)

    expect(screen.getByTestId('motion-div')).toBeInTheDocument()
    expect(screen.getByTestId('notification-button')).toBeInTheDocument()
  })
})
