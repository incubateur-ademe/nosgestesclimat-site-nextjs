import { SupportedRegions } from '@/types/international'
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
  const fileName = `supportedRegions.json`

  return getFileFromModel({ fileName, PRNumber })
}
