import { Page } from '@playwright/test'

// Store the mock user ID to ensure consistency across API calls
let mockUserId: string | null = null
let mockUserEmail: string | null = null
let mockJwtToken: string | null = null

/**
 * Mocks the authentication and verification APIs for E2E tests.
 * This allows tests to proceed without needing database access.
 */
export async function mockAuthApi(page: Page): Promise<void> {
  // Mock the verification code creation API
  // This is called when submitting the email form
  await page.route('**/verification-codes/v1**', async (route) => {
    const request = route.request()
    const postData = request.postDataJSON()

    // Store the email for later use
    if (postData?.email) {
      mockUserEmail = postData.email
    }

    // Return a mock successful response with expiration date
    // The expiration date should be in the future
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + 10) // 10 minutes from now

    console.log(
      'Mocking verification code creation API for email:',
      postData?.email
    )

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        expirationDate: expirationDate.toISOString(),
        email: postData?.email || 'test@example.com',
      }),
    })
  })

  // Mock the backend authentication API (AUTHENTICATION_URL + '/login')
  // This is called by the /api/auth proxy
  await page.route('**/authentication/v1/login**', async (route) => {
    const request = route.request()
    const postData = request.postDataJSON()

    // Generate a consistent user ID for this test session
    if (!mockUserId) {
      mockUserId = `mock-user-id-${Date.now()}`
    }
    if (postData?.email) {
      mockUserEmail = postData.email
    }

    // Create a mock JWT token and store it globally
    mockJwtToken = `mock-jwt-token-${mockUserId}`

    // Return a mock successful authentication response with Set-Cookie header
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'Set-Cookie': `ngcjwt=${mockJwtToken}; Path=/; HttpOnly; SameSite=Lax`,
      },
      body: JSON.stringify({
        id: mockUserId,
        email: postData?.email || mockUserEmail || 'test@example.com',
        success: true,
      }),
    })

    // Also set the cookie in the browser context so it's available for server-side requests
    // Use the request URL to ensure we have a valid domain
    // For localhost, we need to use domain/path, for other domains we can use URL
    const requestUrl = route.request().url()
    const urlObj = new URL(requestUrl)
    const domain = urlObj.hostname

    if (domain === 'localhost' || domain === '127.0.0.1') {
      await page.context().addCookies([
        {
          name: 'ngcjwt',
          value: mockJwtToken!,
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          sameSite: 'Lax',
          secure: false,
        },
      ])
    } else {
      try {
        await page.context().addCookies([
          {
            name: 'ngcjwt',
            value: mockJwtToken!,
            url: requestUrl, // Use URL for non-localhost domains
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
          },
        ])
      } catch (error) {
        // Fallback to domain/path if URL approach fails
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
      }
    }
  })

  // Mock the Next.js API auth route (/api/auth)
  // This proxies to the backend authentication API
  await page.route('**/api/auth**', async (route) => {
    const request = route.request()
    const postData = request.postDataJSON()

    // Generate a consistent user ID for this test session
    if (!mockUserId) {
      mockUserId = `mock-user-id-${Date.now()}`
    }
    if (postData?.email) {
      mockUserEmail = postData.email
    }

    // Create a mock JWT token and store it globally
    mockJwtToken = `mock-jwt-token-${mockUserId}`

    // Get the request URL to determine the domain
    const requestUrl = route.request().url()
    const urlObj = new URL(requestUrl)
    const domain = urlObj.hostname

    // Return a mock successful authentication response with Set-Cookie header
    const response = await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'Set-Cookie': `ngcjwt=${mockJwtToken}; Path=/; HttpOnly; SameSite=Lax${domain !== 'localhost' ? `; Domain=${domain}` : ''}`,
      },
      body: JSON.stringify({
        id: mockUserId,
        email: postData?.email || mockUserEmail || 'test@example.com',
        success: true,
      }),
    })

    // Set the cookie in the browser context so it's available for server-side requests
    // Use the request URL to ensure we have a valid domain
    // For localhost, we need to use domain/path, for other domains we can use URL
    if (domain === 'localhost' || domain === '127.0.0.1') {
      await page.context().addCookies([
        {
          name: 'ngcjwt',
          value: mockJwtToken!,
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          sameSite: 'Lax',
          secure: false,
        },
      ])
    } else {
      try {
        await page.context().addCookies([
          {
            name: 'ngcjwt',
            value: mockJwtToken!,
            url: requestUrl, // Use URL for non-localhost domains
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
          },
        ])
      } catch (error) {
        // Fallback to domain/path if URL approach fails
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
      }
    }

    return response
  })

  // Mock the user check API (CHECK_USER_EXISTS_URL)
  // This is called by getAuthentifiedUser() to verify the user is authenticated
  // This mock handles both authenticated and unauthenticated states
  await page.route('**/users/v1/me**', async (route) => {
    const request = route.request()
    const url = request.url()
    const method = request.method()
    const headers = request.headers()
    const cookies = headers['cookie'] || ''

    console.log(`Mocking /users/v1/me request: ${method} ${url}`)
    console.log(`Request cookies: ${cookies}`)
    console.log(
      `Mock user ID: ${mockUserId}, Email: ${mockUserEmail}, JWT: ${mockJwtToken ? 'present' : 'missing'}`
    )

    // Check if the request has the ngcjwt cookie (user is authenticated)
    // The cookie should be in the format "ngcjwt=value" or "ngcjwt=value; other=cookie"
    const hasJwtCookie =
      cookies.includes('ngcjwt=') &&
      (cookies.includes(`ngcjwt=${mockJwtToken}`) ||
        cookies.match(/ngcjwt=[^;]+/))

    // Case 1: User is authenticated (has cookie and mock user data)
    if (mockUserId && mockUserEmail && hasJwtCookie) {
      console.log('✅ User is authenticated (has cookie), returning mock user')
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

    // Case 2: For testing purposes, if we have mock user data but no cookie in request,
    // we still return the user (this helps with server-side requests where cookies
    // might not be properly forwarded)
    if (mockUserId && mockUserEmail && mockJwtToken) {
      console.log(
        '⚠️ No cookie in request but mock user available, returning mock user for testing'
      )
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

    // Case 3: User is not authenticated (no mock user or no cookie)
    console.log('❌ User is not authenticated, returning 401')
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Unauthorized' }),
    })
  })

  // Mock the user simulations fetch API
  // This is called by fetchUserSimulations() to get the user's simulations
  await page.route('**/simulations/v1/**', async (route) => {
    const url = new URL(route.request().url())
    const pathParts = url.pathname.split('/')
    const userId = pathParts[pathParts.length - 1]

    // If this is a GET request for user simulations
    if (route.request().method() === 'GET' && userId) {
      // Return an array with the saved simulation if we have one
      const savedSimulation = {
        id: `mock-simulation-id-${Date.now()}`,
        date: new Date().toISOString(),
        savedViaEmail: true,
        computedResults: {
          carbone: {
            bilan: 8000, // Mock carbon footprint value
          },
          eau: {
            bilan: 1000, // Mock water footprint value
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
      // This is a POST request to save a simulation
      const request = route.request()
      const postData = request.postDataJSON()

      // Return a mock successful simulation save response
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
      // Continue with the original request for other methods
      await route.continue()
    }
  })
}

/**
 * Gets a mock verification code for testing.
 * In E2E tests, we use this code which will be accepted by the mocked API.
 */
export function getMockVerificationCode(): string {
  // Return a fixed 6-digit code for testing
  // The mocked API will accept any code, but we use a consistent one for clarity
  return process.env.MOCK_VERIFICATION_CODE || '123456'
}
