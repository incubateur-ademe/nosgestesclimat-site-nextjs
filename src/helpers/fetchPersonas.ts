import { DEFAULT_MODEL_VERSION } from '@/constants/modelAPI'
import { NGC_MODEL_API_URL } from '@/constants/urls'
import { Persona } from '@/publicodes-state/types'
import { currentLocale } from 'next-i18n-router'
import importLocalPersonas from './importLocalPersonas'

export default async function fetchPersonas(): Promise<
  Record<string, Persona>
> {
  const locale = currentLocale()
  // FIXME(@florianpanchout): endpoint should not be static (and should point
  // to local if available)
  const serverURL = NGC_MODEL_API_URL
  const isOldAPI = !serverURL.startsWith(NGC_MODEL_API_URL)

  return process.env.NEXT_PUBLIC_LOCAL_DATA === 'nosgestesclimat'
    ? importLocalPersonas(locale)
    : await fetch(
        isOldAPI
          ? `${serverURL}/personas-${locale}.json`
          : `${NGC_MODEL_API_URL}/${DEFAULT_MODEL_VERSION}/${locale}/personas`
      ).then((res) => res.json())
}
