import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { act } from '@testing-library/react'
import { redirect } from 'next/navigation'
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
    const props = {
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({ success: 'true' as const }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(NewsletterSuccessMessage).toHaveBeenCalledWith(
      { locale: 'fr' },
      undefined
    )
    expect(NewsletterErrorMessage).not.toHaveBeenCalled()
    expect(NewsletterInvalidMessage).not.toHaveBeenCalled()
  })

  it('should render the invalid message when success=false and status=404', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({
        success: 'false' as const,
        status: '404' as const,
      }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(NewsletterSuccessMessage).not.toHaveBeenCalled()
    expect(NewsletterErrorMessage).not.toHaveBeenCalled()
    expect(NewsletterInvalidMessage).toHaveBeenCalledWith(
      { locale: 'fr' },
      undefined
    )
  })

  it('should render the error message when success=false and status=500', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({
        success: 'false' as const,
        status: '500' as const,
      }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(NewsletterSuccessMessage).not.toHaveBeenCalled()
    expect(NewsletterErrorMessage).toHaveBeenCalledWith(
      { locale: 'fr' },
      undefined
    )
    expect(NewsletterInvalidMessage).not.toHaveBeenCalled()
  })

  it('should redirect to the 404 page if wrong success param is passed', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({ success: 'toto' as 'true' }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(redirect).toHaveBeenCalledWith('/404')
  })

  it('should redirect to the 404 page if wrong status param is passed', async () => {
    // Given
    const props = {
      params: Promise.resolve({ locale: 'fr' }),
      searchParams: Promise.resolve({
        success: 'false' as const,
        status: '505' as '500',
      }),
    }

    // When
    await act(async () => {
      renderWithWrapper(await NewsletterConfirmationPage(props))
    })

    // Then
    expect(redirect).toHaveBeenCalledWith('/404')
  })
})
