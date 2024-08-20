jest.mock('@/publicodes-state')

import { useGetGroupStats } from '@/hooks/groups/useGetGroupStats'
import type { PointsFortsFaiblesType } from '@/types/groups'
import { faker } from '@faker-js/faker'
import { createGroup } from './fixtures/createGroup'

describe('useGetGroupStats', () => {
  describe('given a group with 2 participants that have different carbon footprint', () => {
    let group: any
    const currentUserId = faker.string.uuid()

    beforeEach(() => {
      group = createGroup(
        [
          {
            name: 'nolan',
          },
          {
            name: 'corentin',
          },
        ],
        currentUserId
      )
    })

    describe('when the points forts and points faibles are compared', () => {
      let result: any

      beforeEach(() => {
        console.log('GROUP', group)
        result = useGetGroupStats({
          groupMembers: group.participants,
          userId: currentUserId,
        })
      })

      it('then it should return 2 points fort and 3 points faibles', () => {
        expect(result.pointsForts).toHaveLength(2)
        expect(result.pointsFaibles).toHaveLength(3)
        //   expect(result).toEqual(
        //     expect.objectContaining({
        //       pointsForts: [
        //         {
        //           key: 'transport . deux roues',
        //           resultObject: {
        //             value: 0,
        //             difference: -116.86560493827166,
        //             name: 'transport . deux roues',
        //           },
        //         },
        //         {
        //           key: 'alimentation . boisson',
        //           resultObject: {
        //             difference: -46.626666666666694,
        //             name: 'alimentation . boisson',
        //             value: 180.16976666666665,
        //           },
        //         },
        //       ],
        //     })
        //   )
      })
    })
  })

  describe('given a group with 3 participants that have different carbon footprints', () => {
    let group: any
    const currentUserId = faker.string.uuid()

    beforeEach(() => {
      group = createGroup(
        [
          {
            name: 'nolan',
          },
          {
            name: 'corentin',
          },
          {
            name: 'sandy',
          },
        ],
        currentUserId
      )
    })

    describe('when the points forts and points faibles are compared', () => {
      let result: any

      beforeEach(() => {
        result = useGetGroupStats({
          groupMembers: group.participants,
          userId: currentUserId,
        })
      })

      it('then it should return pointsForts and pointFaibles that have a difference value !== 0', () => {
        console.log(result)
        expect(
          result.pointsForts.every(
            (p: PointsFortsFaiblesType) => p.resultObject.difference !== 0
          )
        ).toBeTruthy()
        expect(
          result.pointsFaibles.every(
            (p: PointsFortsFaiblesType) => p.resultObject.difference !== 0
          )
        ).toBeTruthy()
      })
    })
  })
})
