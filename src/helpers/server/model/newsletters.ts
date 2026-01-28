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
import { getUser } from './user'

export type NewsletterFormState =
  | { success: true; email?: string; newsletterSubscriptions?: number[] }
  | {
      errors: { email?: string[]; form?: string[] }
      email?: string
      newsletterSubscriptions?: number[]
    }
  | { newsletterSubscriptions?: number[]; email?: string }

function getNewsletterIdsFromFormData(formData: FormData): number[] {
  return Array.from(formData.entries())
    .filter(([key]) => key.startsWith('newsletterSubscriptions.'))
    .filter(([, value]) => value === 'on' || value === 'true')
    .map(([key]) => Number(key.replace('newsletterSubscriptions.', '')))
}

export default async function updateAuthenticatedUserNewsletters(state:NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {

  const user = await getUser()

  const newsletterSubscriptions = getNewsletterIdsFromFormData(formData)

  if (!user) {
    return {
      errors: {
        form: [t('ui.error.userNotFound', "Pas d'utilisateur trouvé")],
      },
      newsletterSubscriptions: newsletterSubscriptions,
    }
  }

  try {
    await fetchWithJWTCookie(`${USER_URL}/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          listIds: newsletterSubscriptions,
        },
      }),
    })
  } catch {
    return {
      errors: {
        form: [
          t(
            'ui.error.errorUpdatingNewsletters',
            'Erreur lors de la mise à jour des infolettres'
          ),
        ],
      },
      newsletterSubscriptions: newsletterSubscriptions,
    }
  }

  trackEvent(clickUpdateUserNewsletters)
  trackPosthogEvent(captureClickUpdateUserNewsletters)

  return {
    success: true,
    newsletterSubscriptions: newsletterSubscriptions,
  }
}

const schema = z.object({
  email: z
    .string()
    .min(1, {
      message: t(
        'ui.emailInput.errors.required',
        'Veuillez entrer une adresse e-mail.'
      ),
    })
    .email({
      message: t(
        'ui.emailInput.errors.invalid',
        'Veuillez entrer une adresse e-mail valide (format attendu : nom.prenom@domaine.fr)'
      ),
    }),
  newsletterSubscriptions: z.array(z.number()),
})

export async function updateUnauthenticatedUserNewsletters(
  formData: FormData,
  userId: string
): Promise<NewsletterFormState> {
  const email = formData.get('email')

  const newsletterSubscriptions = getNewsletterIdsFromFormData(formData)

  const validatedFields = schema.safeParse({
    email,
    newsletterSubscriptions,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: typeof email === 'string' ? email : '',
      newsletterSubscriptions: newsletterSubscriptions,
    }
  }

  const { email: validEmail, newsletterSubscriptions: validNewsletterIds } =
    validatedFields.data

  await fetchWithoutJWTCookie(`${USER_URL}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: validEmail,
      newsletterSubscriptions: validNewsletterIds,
    }),
  })

  trackEvent(clickUpdateUserNewsletters)
  trackPosthogEvent(captureClickUpdateUserNewsletters)

  return {
    success: true,
    newsletterSubscriptions: validNewsletterIds,
    email: validEmail,
  }
}
