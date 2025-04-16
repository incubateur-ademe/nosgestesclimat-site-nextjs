import NewsletterErrorMessage from '../_components/NewsletterErrorMessage'
import NewsletterInvalidMessage from '../_components/NewsletterInvalidMessage'
import NewsletterSuccessMessage from '../_components/NewsletterSuccessMessage'
import NewsletterConfirmationPage from '../page'

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

describe('NewsletterConfirmationPage', () => {
  it('should render success message when success=true', async () => {
    // When
    await NewsletterConfirmationPage({
      params: new Promise((resolve) => resolve({ locale: 'fr' })),
      searchParams: new Promise((resolve) => resolve({ success: 'true' })),
    })

    // Then
    expect(NewsletterSuccessMessage).toHaveBeenCalled()
    expect(NewsletterErrorMessage).not.toHaveBeenCalled()
    expect(NewsletterInvalidMessage).not.toHaveBeenCalled()
  })

  it('should render the invalid message when success=false and status=404', async () => {
    // When
    await NewsletterConfirmationPage({
      params: new Promise((resolve) => resolve({ locale: 'fr' })),
      searchParams: new Promise((resolve) =>
        resolve({ success: 'false', status: '404' })
      ),
    })

    // Then
    expect(NewsletterSuccessMessage).not.toHaveBeenCalled()
    expect(NewsletterErrorMessage).not.toHaveBeenCalled()
    expect(NewsletterInvalidMessage).toHaveBeenCalled()
  })

  it('should render the error message when success=false and status=500', async () => {
    // When
    await NewsletterConfirmationPage({
      params: new Promise((resolve) => resolve({ locale: 'fr' })),
      searchParams: new Promise((resolve) =>
        resolve({ success: 'false', status: '404' })
      ),
    })

    // Then
    expect(NewsletterSuccessMessage).not.toHaveBeenCalled()
    expect(NewsletterErrorMessage).toHaveBeenCalled()
    expect(NewsletterInvalidMessage).not.toHaveBeenCalled()
  })
})
