import i18nConfig from '@/i18nConfig'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname

  // Split the path into segments and remove empty strings
  const segments = pathname.split('/').filter(Boolean)

  // Check if the first segment is a valid locale
  const firstSegment = segments[0]
  const validLocales = i18nConfig.locales

  // If first segment is a valid locale, use it, otherwise use default locale
  const locale = validLocales.includes(firstSegment)
    ? firstSegment
    : i18nConfig.defaultLocale

  return NextResponse.json({ locale })
}
