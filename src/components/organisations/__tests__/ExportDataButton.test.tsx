import { mswServer } from '@/__tests__/server'
import { createPublicOrganisationPoll } from '@/hooks/organisations/polls/__tests__/fixtures/polls.fixture'
import { faker } from '@faker-js/faker'
import { captureException } from '@sentry/nextjs'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { ORGANISATION_URL } from '../../../constants/urls/main'
import ExportDataButton from '../ExportDataButton'

describe('ExportDataButton', () => {
  it('should ask server for an excel file', async () => {
    jest.spyOn(window, 'open').mockImplementation()

    //Given
    const poll = createPublicOrganisationPoll()
    const jobId = faker.string.uuid()
    const resultUrl = faker.internet.url()

    mswServer.use(
      http.get(
        `${ORGANISATION_URL}/${poll.organisation.slug}/polls/${poll.slug}/simulations/download`,
        ({ request }) => {
          const requestUrl = new URL(request.url)

          if (requestUrl.searchParams.get('jobId') === jobId) {
            return HttpResponse.json(
              {
                url: resultUrl,
              },
              {
                status: 200,
              }
            )
          }

          return HttpResponse.json(
            { id: jobId },
            {
              status: 202,
            }
          )
        }
      )
    )

    render(<ExportDataButton poll={poll} />)

    const button = screen.getByRole('button')

    // When
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-disabled', 'true')

    await waitFor(
      () => expect(button).toHaveAttribute('aria-disabled', 'false'),
      {
        timeout: 1000,
      }
    )

    // Then
    expect(window.open).toHaveBeenCalledWith(resultUrl, '_blank')
  })

  it('Should capture the exception in case of error', async () => {
    //Given
    const poll = createPublicOrganisationPoll()

    mswServer.use(
      http.get(
        `${ORGANISATION_URL}/${poll.organisation.slug}/polls/${poll.slug}/simulations/download`,
        () => HttpResponse.error()
      )
    )

    render(<ExportDataButton poll={poll} />)

    const button = screen.getByRole('button')

    // When
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-disabled', 'true')

    await waitFor(
      () => expect(button).toHaveAttribute('aria-disabled', 'false'),
      {
        timeout: 1000,
      }
    )

    // Then
    expect(captureException).toHaveBeenCalledWith(expect.any(Error))
  })
})
