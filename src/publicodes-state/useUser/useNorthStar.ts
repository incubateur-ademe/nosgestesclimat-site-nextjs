import { NorthStarType, NorthStarValue } from '@/types/northstar'
import { User } from '../types'

type Props = {
  setUser: (user: User | ((prevUser: User) => void)) => void
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
