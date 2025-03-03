declare module '*.yaml' {
  const data: any
  export default data
}

declare module '@getbrevo/brevo'

export type DefaultPageProps<
  T = { params: Record<string, string | string[]> },
> = {
  params: Promise<{ locale: string } & T['params']>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}
