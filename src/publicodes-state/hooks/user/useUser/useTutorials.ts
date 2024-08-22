import { Dispatch, SetStateAction } from 'react'
import { Tutorials } from '../../types'
type Props = {
  setTutorials: Dispatch<SetStateAction<Tutorials>>
}

export default function useTutorials({ setTutorials }: Props) {
  const hideTutorial = (tutorial: string) =>
    setTutorials((prevTutorials: Tutorials) => ({
      ...prevTutorials,
      [tutorial]: true,
    }))

  const showTutorial = (tutorial: string) =>
    setTutorials((prevTutorials: Tutorials) => ({
      ...prevTutorials,
      [tutorial]: false,
    }))

  return { hideTutorial, showTutorial }
}
