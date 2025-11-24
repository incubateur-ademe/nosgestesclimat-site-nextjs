import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import NumberInput from '../NumberInput'
// Mock the useLocale hook
vi.mock('@/hooks/useLocale', () => ({
  useLocale: vi.fn(() => 'fr'),
}))

// Mock the Trans component
vi.mock('@/components/translation/trans/TransClient', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}))

describe('NumberInput', () => {
  const defaultProps = {
    setValue: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<NumberInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveValue('')
    })

    it('should render with initial value', () => {
      render(<NumberInput {...defaultProps} value={123.45} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('123,45')
    })

    it('should render with unit', () => {
      render(<NumberInput {...defaultProps} unit="kg" />)

      expect(screen.getByText('kg')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<NumberInput {...defaultProps} className="custom-class" />)

      const container = screen.getByRole('textbox').closest('div')
      expect(container).toHaveClass('custom-class')
    })

    it('should render with custom id', () => {
      render(<NumberInput {...defaultProps} id="custom-id" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('id', 'custom-id')
    })
  })

  describe('Number formatting', () => {
    it('should have correct input attributes', () => {
      render(<NumberInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('autoComplete', 'off')
    })
  })

  describe('Edge cases', () => {
    it('should handle undefined value', () => {
      render(<NumberInput {...defaultProps} value={undefined} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('should handle zero value', () => {
      render(<NumberInput {...defaultProps} value={0} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('0')
    })

    it('should handle number with `,` without removing the decimal separator when not needed', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<NumberInput {...defaultProps} />)
      const input = screen.getByRole('textbox')

      await user.type(input, '4,06')
      vi.advanceTimersByTime(500)

      expect(defaultProps.setValue).toHaveBeenCalledWith(4.06)
      expect(input).toHaveValue('4,06')

      await user.type(input, '{backspace}{backspace}')
      vi.advanceTimersByTime(500)
      expect(input).toHaveValue('4,')
      expect(defaultProps.setValue).toHaveBeenCalledWith(4)
    })

    it('should not change value it props is updated but the value is the same', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      const { rerender } = render(<NumberInput {...defaultProps} />)
      const input = screen.getByRole('textbox')
      await user.type(input, '4,')
      rerender(<NumberInput {...defaultProps} value={4} />)
      expect(input).toHaveValue('4,')
    })
  })
})
