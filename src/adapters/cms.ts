import { captureException } from '@sentry/nextjs'
import axios from 'axios'

export const cmsClient = axios.create({
  baseURL: process.env.CMS_URL,
  headers: {
    Authorization: `Bearer ${process.env.CMS_TOKEN}`,
  },
  adapter: 'fetch',
  fetchOptions: { cache: 'force-cache' },
})

cmsClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('CMS API Error:', error)

    captureException(error)

    return Promise.reject(error)
  }
)

// Rassembler les helpers ici
