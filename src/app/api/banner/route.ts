import { fetchBanner } from '@/services/cms/fetchBanner'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const banner = await fetchBanner()

  return NextResponse.json(banner ?? '')
}
