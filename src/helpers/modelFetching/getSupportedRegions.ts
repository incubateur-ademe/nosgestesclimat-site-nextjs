import { SuppportedRegions } from '@/types/international'
import fetchFileFromModel from './getFileFromModel'

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

  return fetchFileFromModel({ fileName, PRNumber })
}
