import { NorthStarType, NorthStarValue } from '@/types/northstar'
import { Dispatch, SetStateAction } from 'react'
import { User } from '../../types'

type Props = {
  setUser: Dispatch<SetStateAction<User>>
}
export default function useNorthStar({ setUser }: Props) {
  const updateNorthStarRatings = ({
    type,
    value,
  }: {
    type: NorthStarType
    value: NorthStarValue
  }) =>
    setUser((prevUser: User) => ({
      ...prevUser,
      northStarRatings: {
        ...(prevUser?.northStarRatings || {}),
        [type]: value,
      },
    }))

  return { updateNorthStarRatings }
}
