type Props = {
  currentQuestion: string
  currentCategory: any
}

export default function useInitialisation({
  currentQuestion,
  currentCategory,
}: Props) {
  const formInitialized = currentQuestion && currentCategory ? true : false
  return formInitialized || true
}
