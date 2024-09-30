import { Suspense } from 'react'
import DesktopCircles from './icons/DesktopCircles'
import MobileCircles from './icons/MobileCircles'

export default async function Icons() {
  return (
    <>
      <Suspense fallback={null}>
        <DesktopCircles />
      </Suspense>
      <MobileCircles />
    </>
  )
}
