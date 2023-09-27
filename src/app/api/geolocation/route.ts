import { NextRequest, NextResponse } from 'next/server'
import countries from './countries.json'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const country = countries.find(
    (country) => country.code === request.geo?.country
  )

  return NextResponse.json({ country })
}
