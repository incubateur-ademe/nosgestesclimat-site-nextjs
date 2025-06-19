import type { Locale } from '@/i18nConfig'

declare module '@getbrevo/brevo'

export type DefaultPageProps<
  T = {
    params: Record<string, string | string[]>
    searchParams?: Record<string, string | string[]>
  },
> = {
  params: Promise<{ locale: Locale } & T['params']>
  searchParams?: Promise<
    { [key: string]: string | string[] | undefined } & T['searchParams']
  >
}
