'use server'

import type { ListIds } from '@/helpers/server/model/newsletter'
import {
  NEWSLETTER_IDS,
  updateNewsletterSubscription,
} from '@/helpers/server/model/newsletter'
import { isEmailValid, isMicrosoftEmail } from '@/utils/isEmailValid'
import { captureException } from '@sentry/nextjs'

export interface NewsletterFormState {
  email: string
  listIds: ListIds
  error?:
    | 'EMAIL_INVALID'
    | 'EMAIL_REQUIRED'
    | 'EMAIL_MICROSOFT_BLOCKED'
    | 'SERVER_ERROR'
  success?: boolean
}

export async function postNewsletterFormAction(
  _: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const listIds = Object.values(NEWSLETTER_IDS).filter(
    (id) => !!formData.get(id.toString())
  ) as ListIds

  const email = formData.get('email')?.toString()

  if (!email) {
    return {
      email: '',
      listIds,
      error: 'EMAIL_REQUIRED',
    }
  }
  if (!isEmailValid(email)) {
    return {
      email,
      listIds,
      error: 'EMAIL_INVALID',
    }
  }
  if (isMicrosoftEmail(email)) {
    return {
      email,
      listIds,
      error: 'EMAIL_MICROSOFT_BLOCKED',
    }
  }

  try {
    await updateNewsletterSubscription({ email, listIds })
    return {
      email,
      listIds,
      success: true,
    }
  } catch (e) {
    captureException(e)
    return {
      email,
      listIds,
      error: 'SERVER_ERROR',
    }
  }
}
