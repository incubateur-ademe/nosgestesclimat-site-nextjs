import { ORGANISATION_URL } from '@/constants/urls/main'
import type {
  AcceptedExcelExportType,
  ExcelExportType,
  PublicOrganisationPoll,
} from '@/types/organisations'

const isExcelExport = (
  data: AcceptedExcelExportType | ExcelExportType,
  status: number
): data is ExcelExportType => status === 200

const FETCH_POLL_RESULTS_DELAY_MS = 500

export const fetchPollResults = ({
  poll: {
    slug: pollIdOrSlug,
    organisation: { slug: orgaIdOrSlug },
  },
}: {
  poll: PublicOrganisationPoll
}) =>
  new Promise<ExcelExportType>((resolve, reject) => {
    const performRequest = async (jobId?: string) => {
      const url = new URL(
        `${ORGANISATION_URL}/${orgaIdOrSlug}/polls/${pollIdOrSlug}/simulations/download`
      )

      if (jobId) {
        url.searchParams.set('jobId', jobId)
      }

      return fetch(url, {
        credentials: 'include',
      })
        .then((response) =>
          response
            .json()
            .then((data) =>
              isExcelExport(data, response.status)
                ? resolve(data)
                : setTimeout(
                    () => performRequest(data.id),
                    FETCH_POLL_RESULTS_DELAY_MS
                  )
            )
        )
        .catch(reject)
    }

    return performRequest()
  })
