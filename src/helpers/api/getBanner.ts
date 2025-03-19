'use server'

import type { BannerType } from '@/adapters/cmsClient'
import axios from 'axios'

export async function getBanner(): Promise<BannerType | null> {
  return await axios
    .get(
      `${
        process.env.VERCEL_ENV === 'preview' ||
        process.env.VERCEL_ENV === 'production'
          ? 'https'
          : 'http'
      }://${process.env.VERCEL_URL || 'localhost:3000'}/api/banner`
    )
    .then((res) => res.data)
    .catch(() => null)
}
