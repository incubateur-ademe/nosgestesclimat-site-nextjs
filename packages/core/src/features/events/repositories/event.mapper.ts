import type { EventOrganisation } from '../types/event-info.ts'

interface EventComputationRow {
  simulationsCount: number
  organisation: Pick<EventOrganisation, 'id' | 'name' | 'slug' | 'type'>
}

export function mapEventComputationToOrganisation(
  row: EventComputationRow
): EventOrganisation {
  return {
    id: row.organisation.id,
    name: row.organisation.name,
    slug: row.organisation.slug,
    type: row.organisation.type,
    simulationsCount: row.simulationsCount,
  }
}
