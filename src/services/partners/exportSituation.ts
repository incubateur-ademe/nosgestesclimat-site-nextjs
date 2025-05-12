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
  partnerParams?: Record<string, string>
}): Promise<{ redirectUrl: string } | null> {
  try {
    delete partnerParams?.partner

    const { data } = await axios.post(
      `${PARTNER_URL}/${partner}/export-situation`,
      situation,
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
