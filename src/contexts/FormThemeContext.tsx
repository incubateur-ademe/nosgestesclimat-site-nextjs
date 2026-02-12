'use client'

import { createContext, useContext } from 'react'

type FormTheme = 'light' | 'dark'

const FormThemeContext = createContext<FormTheme>('light')

export const FormThemeProvider = FormThemeContext.Provider

export function useFormTheme() {
  return useContext(FormThemeContext)
}

export function useFormThemeErrorColor(lightColor = 'text-red-700') {
  const theme = useFormTheme()
  return theme === 'dark' ? 'text-white' : lightColor
}
