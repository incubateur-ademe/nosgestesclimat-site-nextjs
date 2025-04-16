import { render } from '@testing-library/react'
import NewsletterErrorMessage from '../_components/NewsletterErrorMessage'
import NewsletterInvalidMessage from '../_components/NewsletterInvalidMessage'
import NewsletterSuccessMessage from '../_components/NewsletterSuccessMessage'
import NewsletterConfirmationPage from '../page'

// Mock des composants
jest.mock('../_components/NewsletterSuccessMessage', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}))

jest.mock('../_components/NewsletterErrorMessage', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}))

jest.mock('../_components/NewsletterInvalidMessage', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}))

// Mock des composants de layout
jest.mock('@/components/layout/Header', () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}))

jest.mock('@/design-system/layout/Main', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

describe('NewsletterConfirmationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render success message when success=true', async () => {
    // When
    const jsx = await NewsletterConfirmationPage({
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({ success: 'true' }),
    })

    render(jsx)

    // Then
    expect(NewsletterSuccessMessage).toHaveBeenCalledWith(
      { locale: 'fr' },
      undefined
    )
    expect(NewsletterErrorMessage).not.toHaveBeenCalled()
    expect(NewsletterInvalidMessage).not.toHaveBeenCalled()
  })

  it('should render the invalid message when success=false and status=404', async () => {
    // When
    const jsx = await NewsletterConfirmationPage({
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({ success: 'false', status: '404' }),
    })

    render(jsx)

    // Then
    expect(NewsletterSuccessMessage).not.toHaveBeenCalled()
    expect(NewsletterErrorMessage).not.toHaveBeenCalled()
    expect(NewsletterInvalidMessage).toHaveBeenCalledWith(
      { locale: 'fr' },
      undefined
    )
  })

  it('should render the error message when success=false and status=500', async () => {
    // When
    const jsx = await NewsletterConfirmationPage({
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({ success: 'false', status: '500' }),
    })

    render(jsx)

    // Then
    expect(NewsletterSuccessMessage).not.toHaveBeenCalled()
    expect(NewsletterErrorMessage).toHaveBeenCalledWith(
      { locale: 'fr' },
      undefined
    )
    expect(NewsletterInvalidMessage).not.toHaveBeenCalled()
  })
})
