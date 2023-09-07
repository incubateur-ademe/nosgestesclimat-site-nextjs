type Props = {
  setTutorials: any
}
export default function useTutorials({ setTutorials }: Props) {
  const hideTutorial = (tutorial: string) =>
    setTutorials((prevTutorials: any) => ({
      ...prevTutorials,
      [tutorial]: true,
    }))

  const showTutorial = (tutorial: string) =>
    setTutorials((prevTutorials: any) => ({
      ...prevTutorials,
      [tutorial]: false,
    }))

  return { hideTutorial, showTutorial }
}
