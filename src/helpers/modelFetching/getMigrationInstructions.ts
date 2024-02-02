import { migrationType } from '@/publicodes-state/types'
import fetchFileFromModel from './getFileFromModel'

type Props = {
  PRNumber?: string
}
/**
 * This function is used to get the migration instructions. It can be called directly from a server component.
 */
export default async function getMigrationInstructions({
  PRNumber,
}: Props = {}): Promise<migrationType> {
  const fileName = `migration.json`

  return fetchFileFromModel({ fileName, PRNumber })
}
