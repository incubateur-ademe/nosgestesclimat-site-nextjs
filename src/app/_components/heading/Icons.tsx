import { generateCircleOfSvg } from '@/helpers/generateCircleOfSvg'
import DesktopCircles from './icons/DesktopCircles'
import MobileCircles from './icons/MobileCircles'

const desktopCircles = [
  generateCircleOfSvg({ numPieces: 30, radius: 450, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 35, radius: 535, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 40, radius: 620, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 45, radius: 705, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 50, radius: 790, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 55, radius: 875, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 60, radius: 960, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 65, radius: 1045, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 70, radius: 1130, boundary: [-332, 300] }),
  generateCircleOfSvg({ numPieces: 75, radius: 1215, boundary: [-332, 300] }),
]

export default async function Icons() {
  return (
    <>
      <DesktopCircles circles={desktopCircles} />
      <MobileCircles />
    </>
  )
}
