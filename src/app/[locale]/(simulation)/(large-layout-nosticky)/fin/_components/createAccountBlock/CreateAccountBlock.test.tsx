import {
  trackingUserAccountFakeDoorAccept,
  trackingUserAccountFakeDoorRefuse,
} from '@/constants/tracking/misc'
import { sendDataToGoogleSheet } from '@/services/webhooks/google-sheet'
import { trackEvent } from '@/utils/analytics/trackEvent'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import CreateAccountBlock from './CreateAccountBlock'

// Mock the trackEvent function
jest.mock('@/utils/analytics/trackEvent', () => ({
  trackEvent: jest.fn(),
}))

// Mock the translation hook
jest.mock('@/hooks/useClientTranslation', () => ({
  useClientTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Mock the Google Sheet service
jest.mock('@/services/webhooks/google-sheet', () => ({
  sendDataToGoogleSheet: jest.fn().mockResolvedValue(undefined),
}))

describe('CreateAccountBlock', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('should render default state initially', () => {
    render(<CreateAccountBlock />)
    expect(screen.getByTestId('default-state')).toBeInTheDocument()
  })

  it('should change to accepted state when accepting', () => {
    render(<CreateAccountBlock />)
    const acceptButton = screen.getByTestId('accept-button')
    fireEvent.click(acceptButton)
    expect(screen.getByTestId('accepted-state')).toBeInTheDocument()
    expect(trackEvent).toHaveBeenCalledWith(trackingUserAccountFakeDoorAccept)
  })

  it('should change to refused state when refusing', () => {
    render(<CreateAccountBlock />)
    const refuseButton = screen.getByTestId('refuse-button')
    fireEvent.click(refuseButton)
    expect(screen.getByTestId('refused-state')).toBeInTheDocument()
    expect(trackEvent).toHaveBeenCalledWith(trackingUserAccountFakeDoorRefuse)
  })

  it('should change to thanks state after sending in refused state', async () => {
    render(<CreateAccountBlock />)
    // First refuse
    const refuseButton = screen.getByTestId('refuse-button')
    fireEvent.click(refuseButton)

    // Check a checkbox to enable the form submission
    const checkbox = screen.getByTestId('data-privacy-checkbox')
    fireEvent.click(checkbox)

    // Then send
    const sendButton = screen.getByTestId('send-button')
    fireEvent.click(sendButton)

    // Wait for the state change
    expect(await screen.findByTestId('thanks-state')).toBeInTheDocument()
  })

  it('should send correct data format to Google Sheet when submitting form', async () => {
    render(<CreateAccountBlock />)

    // Go to refused state
    const refuseButton = screen.getByTestId('refuse-button')
    fireEvent.click(refuseButton)

    // Check multiple checkboxes
    const dataPrivacyCheckbox = screen.getByTestId('data-privacy-checkbox')
    const onlyResultCheckbox = screen.getByTestId('only-result-checkbox')
    fireEvent.click(dataPrivacyCheckbox)
    fireEvent.click(onlyResultCheckbox)

    // Submit form
    const sendButton = screen.getByTestId('send-button')
    fireEvent.click(sendButton)

    // Wait for the async operation to complete
    await screen.findByTestId('thanks-state')

    // Verify sendDataToGoogleSheet was called with correct data format
    expect(sendDataToGoogleSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        date: expect.stringMatching(/^'\d{4}-\d{2}-\d{2}$/),
        time: expect.stringMatching(/^'\d{2}:\d{2}$/),
        reasons: expect.stringMatching(
          /^(data_privacy|only_result|not_sure_about_gain|too_many_accounts)(, (data_privacy|only_result|not_sure_about_gain|too_many_accounts))*$/
        ),
      })
    )

    // Verify the specific reasons were included
    const callData = (sendDataToGoogleSheet as jest.Mock).mock.calls[0][0]
    expect(callData.reasons).toContain('data_privacy')
    expect(callData.reasons).toContain('only_result')
  })
})
