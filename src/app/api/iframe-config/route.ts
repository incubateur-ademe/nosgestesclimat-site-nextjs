import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const origin = searchParams.get('origin')

  if (!origin) {
    return NextResponse.json(
      { error: 'Origin parameter is required' },
      { status: 400 }
    )
  }

  const fullDatashareOrigins =
    process.env.NEXT_PUBLIC_FULL_DATASHARE_ORIGINS || ''
  const allowedOrigins = new Set(
    fullDatashareOrigins.split(',').filter(Boolean)
  )

  // Retourner seulement un booléen, pas la liste complète
  return NextResponse.json({
    isAllowed: allowedOrigins.has(origin),
  })
}
