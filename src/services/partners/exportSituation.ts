import { PARTNER_URL } from '@/constants/urls/main'
import type { Situation } from '@/publicodes-state/types'
import { captureException } from '@sentry/nextjs'
import axios from 'axios'

export async function exportSituation({
  situation,
  partner,
  partnerParams,
}: {
  situation: Situation
  partner: string
  partnerParams: URLSearchParams
}): Promise<{ redirectUrl: string } | null> {
  try {
    const { data } = await axios.post(
      `${PARTNER_URL}/${partner}/export-situation`,
      {
        situation,
      },
      {
        params: partnerParams,
      }
    )

    return data
  } catch (err) {
    captureException(err)

    return null
  }
}
