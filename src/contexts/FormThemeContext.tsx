'use client'

import { createContext, useContext } from 'react'

type FormTheme = 'light' | 'dark'

const FormThemeContext = createContext<FormTheme>('light')

export const FormThemeProvider = FormThemeContext.Provider

export function useFormThemeErrorColor(lightColor = 'text-red-800') {
  const theme = useContext(FormThemeContext)
  return theme === 'dark' ? 'text-white' : lightColor
}
