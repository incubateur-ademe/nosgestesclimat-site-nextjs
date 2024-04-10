import { SuppportedRegions } from '@/types/international'
import { supportedRegions } from '@incubateur-ademe/nosgestesclimat'
import { getFileFromModel } from './getFileFromModel'
type Props = {
  PRNumber?: string
}
/**
 * This function is used to get the supported regions. It can be called directly from a server component.
 */
export async function getSupportedRegions({
  PRNumber,
}: Props = {}): Promise<SuppportedRegions> {
  const fileName = `supportedRegions.json`

  if (PRNumber) {
    return getFileFromModel({ fileName, PRNumber })
  }
  return Promise.resolve(supportedRegions as unknown as SuppportedRegions)
}
