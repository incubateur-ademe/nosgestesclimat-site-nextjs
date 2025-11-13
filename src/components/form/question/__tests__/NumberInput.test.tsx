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

    it('should show placeholder when value is provided and the value is missing', () => {
      render(<NumberInput {...defaultProps} isMissing value={100} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder')
      expect(input.getAttribute('placeholder')).toContain('100')
    })
  })

  describe('Number formatting', () => {
    it('should use correct separators for French locale', () => {
      render(<NumberInput {...defaultProps} isMissing value={1234.56} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder')
      console.log(input.getAttribute('placeholder'))
      expect(input.getAttribute('placeholder')).toMatch(/1\s235/)
    })

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

    it('should handle very large numbers', () => {
      render(<NumberInput {...defaultProps} isMissing value={999999999} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder')
      expect(input.getAttribute('placeholder')).toContain('999')
    })

    it('should handle decimal numbers', () => {
      render(<NumberInput {...defaultProps} isMissing value={123.456} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', '123') // Rounded to 0 decimal places
    })
  })
})
