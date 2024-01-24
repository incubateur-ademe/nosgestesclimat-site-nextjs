import { SuppportedRegions } from '@/types/international'
import fetchFileFromModel from './getFileFromModel'

type Props = {
  PRNumber?: string
}
export default async function getSupportedRegions({
  PRNumber,
}: Props = {}): Promise<SuppportedRegions> {
  const fileName = `supportedRegions.json`

  return fetchFileFromModel({ fileName, PRNumber })
}
