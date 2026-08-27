import type { Personas } from '@incubateur-ademe/nosgestesclimat'
import personasEN from '@incubateur-ademe/nosgestesclimat/public/personas-en.json'
import personasFR from '@incubateur-ademe/nosgestesclimat/public/personas-fr.json'
import { fetchModelFile } from '@nosgestesclimat/core/features/models/helpers/fetch-model-file'
import { getPreviewModelBaseUrl } from '@nosgestesclimat/core/features/models/helpers/model-rules-urls'
import { captureException } from '@sentry/nextjs'

const personasByLocale: Record<string, Personas> = {
  fr: personasFR as Personas,
  en: personasEN as Personas,
}

interface Props {
  locale?: string
  PRNumber?: string
}

/*
 * This function is used to get the personas. It can be called directly from a server component.
 */
export async function getPersonas(
  { locale = 'fr', PRNumber }: Props = {
    locale: 'fr',
  }
): Promise<Personas> {
  if (PRNumber) {
    const result = await fetchModelFile<Personas>(
      `${getPreviewModelBaseUrl(PRNumber)}/personas-${locale}.json`
    )
    if (!result.success) {
      // Personas are a convenience feature: fall back to the installed ones
      // rather than breaking the page when a PR build is gone.
      captureException(result.error)
    } else {
      return result.data
    }
  }

  return await Promise.resolve(personasByLocale[locale])
}
