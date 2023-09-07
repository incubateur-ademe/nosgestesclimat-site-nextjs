import { NorthStarType, NorthStarValue } from '@/types/northstar'

type Props = {
  setUser: any
}
export default function useNorthStar({ setUser }: Props) {
  const updateNorthStarRatings = ({
    type,
    value,
  }: {
    type: NorthStarType
    value: NorthStarValue
  }) =>
    setUser((prevUser: any) => ({
      ...prevUser,
      northStarRatings: {
        ...(prevUser?.northStarRatings || {}),
        [type]: value,
      },
    }))

  return { updateNorthStarRatings }
}
