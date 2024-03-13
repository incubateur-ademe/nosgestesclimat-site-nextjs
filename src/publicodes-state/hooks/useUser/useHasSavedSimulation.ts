import { Dispatch, SetStateAction } from 'react'
import { User } from '../../types'

type Props = {
  setUser: Dispatch<SetStateAction<User>>
}
export default function useHasSavedSimulation({ setUser }: Props) {
  const updateHasSavedSimulation = (value: boolean) =>
    setUser((prevUser: User) => ({
      ...prevUser,
      hasSavedSimulation: value,
    }))

  return { updateHasSavedSimulation }
}
