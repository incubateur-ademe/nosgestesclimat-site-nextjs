import { Tutorials } from '../types'

type Props = {
  setTutorials: (
    tutorials: Tutorials | ((prevTutorials: Tutorials) => void)
  ) => void
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
