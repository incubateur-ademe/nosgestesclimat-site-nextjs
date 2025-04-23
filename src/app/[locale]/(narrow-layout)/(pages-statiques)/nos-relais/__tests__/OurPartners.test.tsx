import { fetchPartners } from '@/services/cms/fetchPartners'
import type { DefaultPageProps } from '@/types'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import OurPartners from '../page'

// Mock de la fonction fetchPartners
jest.mock('@/services/cms/fetchPartners')

describe('OurPartners page', () => {
  beforeEach(() => {
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

    ;(fetchPartners as jest.Mock).mockResolvedValue(mockPartners)
  })

  it('should display partners correctly', async () => {
    const props = {
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({ category: '' }),
    } satisfies DefaultPageProps
    await render(<OurPartners {...props} />)

    expect(screen.getByText('Partner 1')).toBeInTheDocument()
    expect(screen.getByText('Partner 2')).toBeInTheDocument()
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('Category 2')).toBeInTheDocument()
  })
})
