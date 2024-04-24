import { personas } from '@incubateur-ademe/nosgestesclimat'
import { getFileFromModel } from './getFileFromModel'

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
): Promise<any> {
  if (PRNumber) {
    const fileName = `personas-${locale}.json`
    return getFileFromModel({ fileName, PRNumber })
  }

  return Promise.resolve(personas[locale])
}
