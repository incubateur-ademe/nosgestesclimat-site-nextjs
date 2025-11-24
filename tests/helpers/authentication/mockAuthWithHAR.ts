import { Page } from '@playwright/test'
import path from 'path'

let mockUserId: string | null = null
let mockUserEmail: string | null = null
let mockJwtToken: string | null = null

type MockAuthWithHAROptions = {
  update?: boolean
  url?: string | RegExp
}

/**
 * Mocks authentication APIs using a HAR file while ensuring the authentication cookie
 * is properly set when validating the verification code.
 *
 * This function:
 * 1. Configures routeFromHAR to mock requests from a HAR file
 * 2. Intercepts the POST /api/auth request (verification code validation)
 * 3. Modifies the response to add the Set-Cookie header with ngcjwt cookie
 * 4. Adds the cookie to the browser context for server-side requests
 *
 * @param page - The Playwright page instance
 * @param harPath - Path to the HAR file (relative to project root or absolute)
 * @param options - Configuration options
 */
export async function mockAuthWithHAR(
  page: Page,
  harPath: string,
  options: MockAuthWithHAROptions = {}
): Promise<void> {
  const { update = false, url } = options

  const resolvedHarPath = path.isAbsolute(harPath)
    ? harPath
    : path.resolve(process.cwd(), harPath)

  await page.route('**/verification-codes/v1**', async (route) => {
    const request = route.request()
    const postData = request.postDataJSON()

    if (postData?.email) {
      mockUserEmail = postData.email
    }

    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + 10)

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        expirationDate: expirationDate.toISOString(),
        email: postData?.email || mockUserEmail || 'test@example.com',
      }),
    })
  })

  await page.route('**/api/auth**', async (route) => {
    const request = route.request()
    const method = request.method()

    if (method !== 'POST') {
      await route.continue()
      return
    }

    const postData = request.postDataJSON()

    if (!mockUserId) {
      mockUserId = `mock-user-id-${Date.now()}`
    }
    if (postData?.email) {
      mockUserEmail = postData.email
    }

    mockJwtToken = `mock-jwt-token-${mockUserId}`

    const requestUrl = request.url()
    const urlObj = new URL(requestUrl)
    const domain = urlObj.hostname

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'Set-Cookie': `ngcjwt=${mockJwtToken}; Path=/; HttpOnly; SameSite=Lax${
          domain !== 'localhost' && domain !== '127.0.0.1'
            ? `; Domain=${domain}`
            : ''
        }`,
      },
      body: JSON.stringify({
        id: mockUserId,
        email: postData?.email || mockUserEmail || 'test@example.com',
        success: true,
      }),
    })

    await page.context().addCookies([
      {
        name: 'ngcjwt',
        value: mockJwtToken!,
        domain: domain,
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
        secure: false,
      },
    ])
  })

  await page.routeFromHAR(resolvedHarPath, {
    update,
    url: url,
    notFound: 'fallback',
  })

  await page.route('**/users/v1/me**', async (route) => {
    const request = route.request()
    const headers = request.headers()
    const cookies = headers['cookie'] || ''

    const browserCookies = await page.context().cookies()
    const ngcjwtCookie = browserCookies.find((c) => c.name === 'ngcjwt')
    const hasCookieInBrowser = !!ngcjwtCookie

    const hasJwtCookie =
      cookies.includes('ngcjwt=') &&
      (cookies.includes(`ngcjwt=${mockJwtToken}`) ||
        cookies.match(/ngcjwt=[^;]+/))

    // User is authenticated (has cookie in request and mock user data)
    if (mockUserId && mockUserEmail && (hasJwtCookie || hasCookieInBrowser)) {
      const requestUrl = request.url()
      const urlObj = new URL(requestUrl)
      const domain = urlObj.hostname

      await page.context().addCookies([
        {
          name: 'ngcjwt',
          value: mockJwtToken!,
          domain: domain,
          path: '/',
          httpOnly: true,
          sameSite: 'Lax',
          secure: false,
        },
      ])

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: mockUserId,
          email: mockUserEmail,
        }),
      })
      return
    }

    // User is not authenticated (no mock user or no cookie)
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Unauthorized' }),
    })
  })

  await page.route('**/simulations/v1/**', async (route) => {
    const url = new URL(route.request().url())
    const pathParts = url.pathname.split('/')
    const userId = pathParts[pathParts.length - 1]

    if (route.request().method() === 'GET' && userId) {
      const savedSimulation = {
        id: `mock-simulation-id-${Date.now()}`,
        date: new Date().toISOString(),
        savedViaEmail: true,
        computedResults: {
          carbone: {
            bilan: 8000,
          },
          eau: {
            bilan: 1000,
          },
        },
        situation: {},
        progression: 100,
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([savedSimulation]),
      })
    } else if (route.request().method() === 'POST') {
      const request = route.request()
      const postData = request.postDataJSON()

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: `mock-simulation-id-${Date.now()}`,
          ...postData,
          date: new Date().toISOString(),
          savedViaEmail: true,
        }),
      })
    } else {
      await route.continue()
    }
  })
}

/**
 * Gets a mock verification code for testing.
 * When using HAR files, you can extract the code from the HAR or use this helper.
 */
export function getMockVerificationCode(): string {
  return process.env.MOCK_VERIFICATION_CODE || '123456'
}
