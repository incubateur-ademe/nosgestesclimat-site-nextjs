import { Participant } from '@/types/groups'
import { faker } from '@faker-js/faker'
import personas from '@incubateur-ademe/nosgestesclimat/public/personas-fr.json'

export function createGroup(
  participants: Partial<Participant>[],
  currentUserId: string
) {
  return {
    participants: participants.map((p, index) => {
      console.log(
        'ICI',
        personas[`personas . ${p.name}` as keyof typeof personas]
      )
      return {
        // We set the first participant as the current user
        userId: !index ? currentUserId : faker.string.uuid(),
        simulation: {
          situation:
            personas[`personas . ${p.name}` as keyof typeof personas].situation,
        },
      }
    }),
  }
}
