import Script from 'next/script'
import { PropsWithChildren } from 'react'
import ImpactCO2ScriptAdder from './_components/ImpactCO2ScriptAdder'

export default async function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Script src="https://impactco2.fr/scripts/detection.js" />

      <ImpactCO2ScriptAdder />
      {children}
    </>
  )
}
