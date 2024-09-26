import { Participant } from '@/types/groups'
import { faker } from '@faker-js/faker'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import personas from '@incubateur-ademe/nosgestesclimat/public/personas-fr.json'

export function createGroup({
  participants,
  currentUserId,
}: {
  participants: Partial<Participant>[]
  currentUserId: string
}) {
  return {
    participants: participants.map((p, index) => ({
      // We set the first participant as the current user
      userId: !index ? currentUserId : faker.string.uuid(),
      simulation: {
        id: faker.string.uuid(),
        date: faker.date.recent().toISOString(),
        foldedSteps: [],
        actionChoices: {},
        computedResults: {
          carbone: {
            bilan: faker.number.float(),
            categories: {} as Record<DottedName, number>,
            subcategories: {} as Record<DottedName, number>,
          },
          eau: {
            bilan: faker.number.float(),
            categories: {} as Record<DottedName, number>,
            subcategories: {} as Record<DottedName, number>,
          },
        },

        progression: 1,
        situation:
          personas[`personas . ${p.name}` as keyof typeof personas].situation,
      },
      name: p.name || faker.name.firstName(),
      _id: faker.database.mongodbObjectId(),
    })),
  }
}
