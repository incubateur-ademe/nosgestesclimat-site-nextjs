jest.mock('@/publicodes-state')

import { useGetGroupStats } from '@/hooks/groups/useGetGroupStats'
import { Participant } from '@/types/groups'
import { faker } from '@faker-js/faker'
import { createGroup } from './fixtures/createGroup'

describe('useGetGroupStats', () => {
  describe('given a group with 2 participants that have different carbon footprint', () => {
    let group: ReturnType<typeof createGroup>
    const currentUserId = faker.string.uuid()

    beforeEach(() => {
      group = createGroup({
        participants: [
          {
            name: 'nolan',
            footprintSize: 'medium',
          } as Participant & { footprintSize: 'medium' },
          {
            name: 'corentin',
            footprintSize: 'medium',
          } as Participant & { footprintSize: 'medium' },
        ],
        currentUserId,
      })
    })

    describe('when the points forts and points faibles are compared', () => {
      let result: ReturnType<typeof useGetGroupStats>

      beforeEach(() => {
        result = useGetGroupStats({
          groupMembers: group.participants as unknown as Participant[],
          userId: currentUserId,
        })
      })

      it('then it should return 2 points fort and 3 points faibles', () => {
        expect(result.pointsForts).toHaveLength(2)
        expect(result.pointsFaibles).toHaveLength(3)
      })
    })
  })

  describe('given a group with 3 participants that have different carbon footprints', () => {
    let group: ReturnType<typeof createGroup>
    const currentUserId = faker.string.uuid()

    beforeEach(() => {
      group = createGroup({
        participants: [
          {
            name: 'nolan',
            footprintSize: 'small',
          } as Participant & { footprintSize: 'small' },
          {
            name: 'corentin',
            footprintSize: 'medium',
          } as Participant & { footprintSize: 'medium' },
          {
            name: 'sandy',
            footprintSize: 'large',
          } as Participant & { footprintSize: 'large' },
        ],
        currentUserId,
      })
    })

    describe('when the points forts and points faibles are compared', () => {
      let result: ReturnType<typeof useGetGroupStats>

      beforeEach(() => {
        result = useGetGroupStats({
          groupMembers: group.participants as unknown as Participant[],
          userId: currentUserId,
        })
      })

      it('then it should return pointsForts and pointFaibles that have a difference value !== 0', () => {
        expect(
          result.pointsForts.every((p) => p.resultObject.difference !== 0)
        ).toBeTruthy()
        expect(
          result.pointsFaibles.every((p) => p.resultObject.difference !== 0)
        ).toBeTruthy()
      })
    })
  })
})
