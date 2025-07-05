import { fetchPartners } from '@/services/cms/fetchPartners'
import type { DefaultPageProps } from '@/types'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { beforeAll, vi } from 'vitest'
import OurPartners from '../page'

// Mock de la fonction fetchPartners
vi.mock('@/services/cms/fetchPartners')

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

describe('OurPartners page', () => {
  beforeAll(() => {
    ;(fetchPartners as vi.Mock).mockResolvedValue({ data: mockPartners })
  })

  it('should display partners correctly', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({}),
    } satisfies DefaultPageProps

    // When
    render(await OurPartners(props))

    // Then
    // The categories are displayed
    expect(
      screen.queryAllByText(mockPartners[0].category.category)[0]
    ).toBeInTheDocument()
    expect(
      screen.queryAllByText(mockPartners[1].category.category)[0]
    ).toBeInTheDocument()
    // The partners are displayed
    expect(screen.queryByText(mockPartners[0].name)).toBeInTheDocument()
    expect(screen.queryByText(mockPartners[1].name)).toBeInTheDocument()
  })
})
