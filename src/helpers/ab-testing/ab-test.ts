import { AB_TESTS } from '@/constants/ab-tests'
import { NextRequest, NextResponse } from 'next/server'

const THRESHOLD = 0.5

export function ABTest(request: NextRequest) {
  const url = request.nextUrl.clone()

  const currentABTest = AB_TESTS.find(({ stringToMatch }) => {
    return url.pathname === stringToMatch
  })

  if (!currentABTest) return false

  // Get the variant from the cookies
  // If not found, randomly set a variant based on threshold
  const randomNumber = Math.random()

  const variant =
    request.cookies.get(currentABTest.name)?.value ||
    (randomNumber < THRESHOLD ? currentABTest.newPath : currentABTest.oldPath)

  url.pathname = variant as string

  const response = NextResponse.rewrite(url)

  // set the variant in the cookie if not already set
  if (!request.cookies.get(currentABTest.name)) {
    response.cookies.set(currentABTest.name, variant as string)
  }

  return response
}
