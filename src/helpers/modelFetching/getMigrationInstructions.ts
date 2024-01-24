import fetchFileFromModel from './getFileFromModel'
import { migrationType } from '@/publicodes-state/types'

type Props = {
  PRNumber?: string
}
export default async function getMigrationInstructions({
  PRNumber,
}: Props = {}): Promise<migrationType> {
  const fileName = `migration.json`

  return fetchFileFromModel({ fileName, PRNumber })
}
