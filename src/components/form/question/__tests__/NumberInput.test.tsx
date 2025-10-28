import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
    isMissing: false,
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
      render(
        <NumberInput {...defaultProps} value={123.45} displayedValue="123,45" />
      )

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

    it('should show placeholder when value is provided', () => {
      render(<NumberInput {...defaultProps} value={1000} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder')
      expect(input.getAttribute('placeholder')).toContain('1')
      expect(input.getAttribute('placeholder')).toContain('000')
    })
  })

  describe('Value handling', () => {
    it('should call setValue when value changes', () => {
      const setValue = vi.fn()
      const setDisplayedValue = vi.fn()
      const { rerender } = render(
        <NumberInput
          {...defaultProps}
          setValue={setValue}
          setDisplayedValue={setDisplayedValue}
        />
      )

      // Simulate value change from props
      rerender(
        <NumberInput
          {...defaultProps}
          setValue={setValue}
          setDisplayedValue={setDisplayedValue}
          value={123}
          displayedValue="123"
        />
      )

      expect(setValue).toHaveBeenCalledWith(123)
      expect(setDisplayedValue).toHaveBeenCalledWith('123')
    })

    it('should not debounce value changes from props', () => {
      const setValue = vi.fn()
      const { rerender } = render(
        <NumberInput {...defaultProps} setValue={setValue} />
      )

      // Simulate value change from props (not user input)
      rerender(
        <NumberInput
          {...defaultProps}
          setValue={setValue}
          value={456}
          displayedValue="456"
        />
      )

      // Should be called immediately without debouncing
      expect(setValue).toHaveBeenCalledWith(456)
    })
  })

  describe('Number formatting', () => {
    it('should use correct separators for French locale', () => {
      render(<NumberInput {...defaultProps} value={1234.56} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder')
      expect(input.getAttribute('placeholder')).toContain('1')
      expect(input.getAttribute('placeholder')).toContain('235')
    })

    it('should have correct input attributes', () => {
      render(<NumberInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('autoComplete', 'off')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty string value', () => {
      render(<NumberInput {...defaultProps} value="" displayedValue="" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('should handle undefined value', () => {
      render(<NumberInput {...defaultProps} value={undefined} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('should handle zero value', () => {
      render(<NumberInput {...defaultProps} value={0} displayedValue="0" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('0')
    })

    it('should handle very large numbers', () => {
      render(<NumberInput {...defaultProps} value={999999999} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder')
      expect(input.getAttribute('placeholder')).toContain('999')
    })

    it('should handle decimal numbers', () => {
      render(<NumberInput {...defaultProps} value={123.456} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', '123') // Rounded to 0 decimal places
    })
  })
})
