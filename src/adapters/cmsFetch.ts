import { captureException } from '@sentry/nextjs'

export const cmsFetch = async (url: string, options: RequestInit = {}) => {
  const fullUrl = `${process.env.CMS_URL}${url}`
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${process.env.CMS_TOKEN}`,
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      cache: 'force-cache',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('CMS API Error:', error)

    captureException(error)

    throw error
  }
}
