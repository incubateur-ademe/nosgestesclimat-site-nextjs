jest.mock('@/publicodes-state')

import { useGetGroupStats } from '@/hooks/groups/useGetGroupStats'
import { faker } from '@faker-js/faker'
import { createGroup } from './fixtures/createGroup'

describe('useGetGroupStats', () => {
  describe('given a group with 2 participants', () => {
    let group: any
    const currentUserId = faker.string.uuid()

    beforeEach(() => {
      group = createGroup(
        [
          {
            name: 'yoram',
          },
          {
            name: 'mehdi',
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
})
