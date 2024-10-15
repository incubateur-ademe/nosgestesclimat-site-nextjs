import { Suspense } from 'react'
import TempCircles from './icons/TempCircles'

export default async function Icons() {
  return (
    <>
      <Suspense fallback={null}>
        <TempCircles />
      </Suspense>
    </>
  )
}
