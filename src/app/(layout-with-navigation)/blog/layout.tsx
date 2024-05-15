import Script from 'next/script'
import { PropsWithChildren } from 'react'

export default async function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Script src="https://impactco2.fr/scripts/detection.js" />
      {children}
    </>
  )
}
