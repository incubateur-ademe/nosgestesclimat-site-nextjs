import type { PublicOrganisationPoll } from '@/types/organisations'
import { faker } from '@faker-js/faker'

export const createPublicOrganisationPoll = (
  poll: Partial<PublicOrganisationPoll> = {}
): PublicOrganisationPoll => ({
  id: faker.string.uuid(),
  name: faker.company.buzzNoun(),
  slug: faker.internet.domainWord(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  simulations: {
    count: faker.number.int({ min: 0, max: 100 }),
    finished: faker.number.int({ min: 0, max: 100 }),
    hasParticipated: faker.datatype.boolean(),
  },
  organisation: {
    id: faker.string.uuid(),
    name: faker.company.name(),
    slug: faker.internet.domainWord(),
  },
  ...poll,
})
