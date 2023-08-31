import { headers } from 'next/headers'

export const getServerLocale = (): string | null => {
  return headers().get('x-next-i18n-router-locale')
}
