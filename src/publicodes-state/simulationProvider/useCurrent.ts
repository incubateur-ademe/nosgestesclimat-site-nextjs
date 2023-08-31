import { useState } from 'react'

export default function useCurrent() {
  const [currentQuestion, setCurrentQuestion] = useState<null | string>(null)

  const [currentCategory, setCurrentCategory] = useState<null | string>(null)

  return {
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
  }
}
