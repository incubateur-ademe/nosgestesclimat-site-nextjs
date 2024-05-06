import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import supportedRegions from '@incubateur-ademe/nosgestesclimat/public/supportedRegions.json'
import { importPreviewFile } from './importPreviewFile'
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
    return importPreviewFile({ fileName, PRNumber })
  }

  return Promise.resolve(supportedRegions)
}
