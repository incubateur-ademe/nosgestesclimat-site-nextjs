'use client'

import { PropsWithChildren, createContext } from 'react'

export const LangContext = createContext({
	lang: 'fr',
})

export const LangProvider = ({
	children,
	lang,
}: PropsWithChildren<{ lang: string }>) => {
	return (
		<LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
	)
}
