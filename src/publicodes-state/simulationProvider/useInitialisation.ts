import { useMemo } from 'react'

type Props = {
  currentQuestion: string
  currentCategory: any
}

export default function useInitialisation({
  currentQuestion,
  currentCategory,
}: Props) {
  const formInitialized = useMemo(
    () => (currentQuestion && currentCategory ? true : false),
    [currentQuestion, currentCategory]
  )
  return formInitialized
}
