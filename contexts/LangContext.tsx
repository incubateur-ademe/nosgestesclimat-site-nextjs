'use client'

import { PropsWithChildren, createContext, useContext } from 'react'

export const LangContext = createContext('fr')

export const LangProvider = ({
	children,
	lang,
}: PropsWithChildren<{ lang: string }>) => {
	return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export const useLang = () => {
	return useContext(LangContext)
}
