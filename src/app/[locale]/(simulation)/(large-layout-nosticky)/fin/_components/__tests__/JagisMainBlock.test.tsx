import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JagisMainBlock from '../JagisMainBlock'

const mockExportSituation = jest.fn()

jest.mock('@/hooks/partners/useExportSituation', () => ({
  useExportSituation: () => ({
    exportSituation: mockExportSituation,
  }),
}))

describe('JagisMainBlock', () => {
  it('should call export situation when the button is clicked', async () => {
    // Given
    render(<JagisMainBlock />)

    // When
    await userEvent.click(screen.getByRole('button'))

    // Then
    expect(mockExportSituation).toHaveBeenCalled()
  })
})
