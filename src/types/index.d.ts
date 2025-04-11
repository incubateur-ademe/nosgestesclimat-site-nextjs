declare module '@getbrevo/brevo'

export type DefaultPageProps<
  T = {
    params: Record<string, string | string[]>
    searchParams?: Record<string, string | string[]>
  },
> = {
  params: Promise<{ locale: string } & T['params']>
  searchParams?: Promise<
    { [key: string]: string | string[] | undefined } & T['searchParams']
  >
}
