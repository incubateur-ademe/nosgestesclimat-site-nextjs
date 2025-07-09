import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import JagisSecondaryBlock from '../JagisSecondaryBlock'

const mockExportSituation = vi.fn()

vi.mock('@/hooks/partners/useExportSituation', () => ({
  useExportSituation: () => ({
    exportSituation: mockExportSituation,
  }),
}))

describe('JagisSecondaryBlock', () => {
  it('should call export situation when the button is clicked', async () => {
    // Given
    render(<JagisSecondaryBlock />)

    // When
    await userEvent.click(screen.getByRole('button'))

    // Then
    expect(mockExportSituation).toHaveBeenCalled()
  })
})
