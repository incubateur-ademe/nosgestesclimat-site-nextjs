import {
  SupportedRegions,
  supportedRegions,
} from '@incubateur-ademe/nosgestesclimat'
import { getFileFromModel } from './getFileFromModel'
type Props = {
  PRNumber?: string
}
/**
 * This function is used to get the supported regions. It can be called directly from a server component.
 */
export async function getSupportedRegions({
  PRNumber,
}: Props = {}): Promise<SupportedRegions> {
  if (PRNumber) {
    const fileName = `supportedRegions.json`
    return getFileFromModel({ fileName, PRNumber })
  }

  return Promise.resolve(supportedRegions)
}
