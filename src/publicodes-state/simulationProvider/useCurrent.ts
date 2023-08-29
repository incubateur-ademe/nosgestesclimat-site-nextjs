import { useState } from 'react'

type Props = {
  engine: any
  situation: any
  categories: string[]
}

export default function useCurrent({ categories }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<null | string>(null)

  const [currentCategory, setCurrentCategory] = useState<null | string>(null)

  // useEffect(() => {
  //   if (currentQuestion && !currentCategory.find(currentQuestion)) {
  //     setCurrentCategory(
  //       categories.find(
  //         (category) => category === currentQuestion.split(' . ')[0]
  //       )
  //     )
  //   }
  // }, [categories, currentCategory, currentQuestion])

  return {
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
  }
}
