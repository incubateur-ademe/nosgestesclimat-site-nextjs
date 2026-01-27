'use server'

import {
  captureClickUpdateUserNewsletters,
  clickUpdateUserNewsletters,
} from '@/constants/tracking/user-account'
import { USER_URL } from '@/constants/urls/main'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { z } from 'zod'
import { fetchWithJWTCookie, fetchWithoutJWTCookie } from './fetchWithJWTCookie'
import type { BrevoContact } from './user'
import { getUser } from './user'

export type NewsletterFormState =
  | { success: true }
  | { errors: { email?: { message: string } } }
  | { newsletterIds: number[]; email?: string }

function getNewsletterIdsFromFormData(formData: FormData): number[] {
  return Array.from(formData.entries())
    .filter(([key]) => key.startsWith('newsletterIds.'))
    .filter(([, value]) => value === 'on' || value === 'true')
    .map(([key]) => Number(key.replace('newsletterIds.', '')))
}

export default async function updateAuthenticatedUserNewsletters(
  formData: FormData
): Promise<NewsletterFormState> {
  const user = await getUser()

  if (!user) {
    return {
      errors: {
        form: { message: 'User not found' },
      },
    }
  }

  const newsletterIds = getNewsletterIdsFromFormData(formData)
  await fetchWithJWTCookie(`${USER_URL}/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      contact: {
        listIds: newsletterIds,
      },
    }),
  })

  trackEvent(clickUpdateUserNewsletters)
  trackPosthogEvent(captureClickUpdateUserNewsletters)

  return {
    success: true,
  }
}

const schema = z.object({
  email: z
    .string()
    .min(1, {
      message: t(
        'ui.emailInput.errors.required',
        'Veuillez entrer une adresse email valide (format attendu : nom.prenom@domaine.fr)'
      ),
    })
    .email({
      message: t(
        'ui.emailInput.errors.invalid',
        'Veuillez entrer une adresse email valide (format attendu : nom.prenom@domaine.fr)'
      ),
    }),
  newsletterIds: z.array(z.number()),
})

export async function updateUnauthenticatedUserNewsletters(
  formData: FormData,
  userId: string
): Promise<NewsletterFormState> {
  const email = formData.get('email')
  const newsletterIds = getNewsletterIdsFromFormData(formData)
  const validatedFields = schema.safeParse({ email, newsletterIds })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as string[],
    }
  }

  const { email: validEmail, newsletterIds: validNewsletterIds } =
    validatedFields.data

  await fetchWithoutJWTCookie(`${USER_URL}/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      email: validEmail,
      newsletterIds: validNewsletterIds,
    }),
  })

  trackEvent(clickUpdateUserNewsletters)
  trackPosthogEvent(captureClickUpdateUserNewsletters)

  return {
    success: true,
  }
}

export async function getNewsletterSubscriptions(userId: string) {
  const response = (await fetchWithoutJWTCookie(
    `${USER_URL}/${userId}/contact`
  )) as { data?: BrevoContact }

  return response.data?.listIds ?? []
}
