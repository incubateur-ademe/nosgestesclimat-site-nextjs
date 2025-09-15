import type { Personas } from '@incubateur-ademe/nosgestesclimat'
import personasEN from '@incubateur-ademe/nosgestesclimat/public/personas-en.json'
import personasES from '@incubateur-ademe/nosgestesclimat/public/personas-es.json'
import personasFR from '@incubateur-ademe/nosgestesclimat/public/personas-fr.json'
import { importPreviewFile } from './importPreviewFile'

const personasByLocale: Record<string, Personas> = {
  /* TypeScript widens JSON string literals to `string`, so values like "answered"or "default" don't match the expected union type. We import the JSON as `unknown` and assert it to `Personas` to bypass this limitation.*/
  fr: personasFR as unknown as Personas,
  en: personasEN as unknown as Personas,
  es: personasES as unknown as Personas,
}
type Props = {
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
    const fileName = `personas-${locale}.json`
    return importPreviewFile({ fileName, PRNumber })
  }

  return Promise.resolve(personasByLocale[locale])
}
