import { Persona } from '@/publicodes-state/types'
import fetchFileFromModel from './getFileFromModel'

type Props = {
  locale?: string
  PRNumber?: string
}

export default async function getPersonas(
  { locale = 'fr', PRNumber }: Props = {
    locale: 'fr',
  }
): Promise<Record<string, Persona>> {
  const fileName = `/personas-${locale}.json`

  return fetchFileFromModel({ fileName, PRNumber })
}
