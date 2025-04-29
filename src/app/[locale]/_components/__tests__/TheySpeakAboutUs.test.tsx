import { fetchPartners } from '@/services/cms/fetchPartners'
import { beforeAll } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TheySpeakAboutUs from '../TheySpeakAboutUs'

// Mock de la fonction fetchPartners
jest.mock('@/services/cms/fetchPartners')

const mockPartners = [
  {
    name: 'Partner 1',
    imageSrc: '/partner1.png',
    link: 'https://partner1.com',
    category: { category: 'Category 1' },
    displayOrder: 1,
  },
  {
    name: 'Partner 2',
    imageSrc: '/partner2.png',
    link: 'https://partner2.com',
    category: { category: 'Category 2' },
    displayOrder: 2,
  },
]

describe('TheySpeakAboutUs component', () => {
  beforeAll(() => {
    ;(fetchPartners as jest.Mock).mockResolvedValue(mockPartners)
  })

  it('should display partners correctly', async () => {
    // When
    render(
      await TheySpeakAboutUs({
        locale: 'fr',
      })
    )

    // Then
    // The categories are displayed
    // The partners are displayed
    expect(screen.queryAllByTestId('partner-theyspeakaboutus')).toHaveLength(2)
  })
})
