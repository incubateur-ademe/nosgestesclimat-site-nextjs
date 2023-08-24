import { useMemo } from 'react'

type Props = {
	relevantQuestions: string[]
	questionsByCategories: {
		[key: string]: string[]
	}
	currentQuestion: string
	currentCategory: string
	setCurrentQuestion: Function
	setDefaultAsValue: Function
}

export default function useNavigation({
	relevantQuestions,
	questionsByCategories,
	currentQuestion,
	currentCategory,
	setCurrentQuestion,
	setDefaultAsValue,
}: Props) {
	const currentIndex = useMemo(
		() => relevantQuestions.indexOf(currentQuestion),
		[relevantQuestions, currentQuestion],
	)

	const currentIndexInCategory = useMemo(
		() => questionsByCategories[currentCategory]?.indexOf(currentQuestion),
		[questionsByCategories, currentQuestion, currentCategory],
	)

	const noPrevQuestion = useMemo(() => currentIndex === 0, [currentIndex])

	const noNextQuestion = useMemo(
		() => currentIndex === relevantQuestions.length - 1,
		[currentIndex, relevantQuestions],
	)

	const noNextQuestionInCategory = useMemo(
		() =>
			currentIndexInCategory ===
			questionsByCategories[currentCategory].length - 1,
		[questionsByCategories, currentIndexInCategory, currentCategory],
	)

	// TODO : use Promises
	const gotoNextQuestion = async () => {
		const currentIndex = relevantQuestions.indexOf(currentQuestion)
		if (currentIndex < relevantQuestions.length) {
			await setDefaultAsValue()

			setCurrentQuestion(
				relevantQuestions[relevantQuestions.indexOf(currentQuestion) + 1],
			)
		}
	}
	const gotoPrevQuestion = () => {
		const currentIndex = relevantQuestions.indexOf(currentQuestion)
		if (currentIndex > 0) {
			setCurrentQuestion(
				relevantQuestions[relevantQuestions.indexOf(currentQuestion) - 1],
			)
		}
	}

	return {
		gotoNextQuestion,
		gotoPrevQuestion,
		noPrevQuestion,
		noNextQuestion,
		noNextQuestionInCategory,
	}
}
