// app/providers.jsx
'use client'
import { captureException } from '@sentry/nextjs'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      return
    }
    try {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        autocapture: false, // Disable automatic event capture, as we capture manually
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true, // Enable pageleave capture
      })
    } catch (error) {
      captureException(error)
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
