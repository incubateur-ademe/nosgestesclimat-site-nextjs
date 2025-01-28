import type { PropsWithChildren } from 'react'
import ImpactCO2ScriptAdder from './_components/ImpactCO2ScriptAdder'

export default async function ArticleLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ImpactCO2ScriptAdder />

      {children}
    </>
  )
}
