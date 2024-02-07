import { PropsWithChildren } from 'react'
import { FiltersProvider } from './_components/FiltersProvider'

export default async function Layout({ children }: PropsWithChildren) {
  return <FiltersProvider>{children}</FiltersProvider>
}
