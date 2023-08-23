'use client'

import React from 'react'

import SimulationContext from './context'
import useEngine from './useEngine'
import useCategories from './useCategories'
import useQuestions from './useQuestions'
import useProgression from './useProgression'
import useCurrent from './useCurrent'
import useSituation from './useSituation'
import useInitialisation from './useInitialisation'

type Props = {
	rules: any
	categoryOrder: string[]
	children: React.ReactNode
	loader: React.ReactNode
	defaultSituation?: any
	situation: any
	setSituation: Function
}

export default function SimulationProvider({
	rules,
	categoryOrder,
	children,
	loader,
	defaultSituation,
	situation: externalSituation,
	setSituation: setExternalSituation,
}: Props) {
	const engine = useEngine(rules)

	const { situation, updateSituation } = useSituation({
		engine,
		defaultSituation,
		externalSituation,
		setExternalSituation,
	})

	const { categories, subcategories } = useCategories({
		engine,
		order: categoryOrder,
	})

	const {
		missingInputs,
		everyMosaicChildWhoIsReallyInMosaic,
		relevantQuestions,
		questionsByCategories,
	} = useQuestions({ engine, categories, situation })

	const {
		remainingQuestions,
		progression,
		remainingQuestionsByCategories,
		progressionByCategory,
	} = useProgression({
		categories,
		missingInputs,
		relevantQuestions,
		questionsByCategories,
	})

	const { currentQuestion, currentCategory, setCurrentQuestion } = useCurrent({
		engine,
		situation,
		remainingQuestions,
		categories,
	})

	const formInitialized = useInitialisation({
		currentQuestion,
		currentCategory,
	})

	return (
		<SimulationContext.Provider
			value={{
				rules,
				engine,
				situation,
				updateSituation,
				categories,
				subcategories,
				everyMosaicChildWhoIsReallyInMosaic,
				relevantQuestions,
				questionsByCategories,
				progression,
				remainingQuestions,
				remainingQuestionsByCategories,
				progressionByCategory,
				currentQuestion,
				currentCategory,
				setCurrentQuestion,
			}}
		>
			{formInitialized ? children : loader}
		</SimulationContext.Provider>
	)
}
