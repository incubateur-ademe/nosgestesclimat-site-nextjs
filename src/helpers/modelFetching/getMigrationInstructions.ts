import { MigrationType } from '@/publicodes-state/types'
import { migration } from '@incubateur-ademe/nosgestesclimat'
import { getFileFromModel } from './getFileFromModel'

type Props = {
  PRNumber?: string
}
/**
 * This function is used to get the migration instructions. It can be called directly from a server component.
 */
export async function getMigrationInstructions({
  PRNumber,
}: Props = {}): Promise<MigrationType> {
  if (PRNumber) {
    const fileName = `migration.json`
    
    return getFileFromModel({ fileName, PRNumber })
  }

  return Promise.resolve(migration)
}
