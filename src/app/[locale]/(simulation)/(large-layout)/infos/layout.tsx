import type { PropsWithChildren } from 'react'
import InfosProvider from './_components/InfosProvider'

export default async function Infos({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <InfosProvider>{children}</InfosProvider>
    </div>
  )
}
