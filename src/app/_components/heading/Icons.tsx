import generateCircleOfSvg from '@/helpers/generateCircleOfSvg'
import DesktopCircles from './icons/DesktopCircles'
import MobileCircles from './icons/MobileCircles'

const desktopCircles = [
  generateCircleOfSvg({ numPieces: 30, radius: 450 }),
  generateCircleOfSvg({ numPieces: 35, radius: 535 }),
  generateCircleOfSvg({ numPieces: 40, radius: 620 }),
  generateCircleOfSvg({ numPieces: 45, radius: 705 }),
  generateCircleOfSvg({ numPieces: 50, radius: 790 }),
  generateCircleOfSvg({ numPieces: 55, radius: 875 }),
  generateCircleOfSvg({ numPieces: 60, radius: 960 }),
  generateCircleOfSvg({ numPieces: 65, radius: 1045 }),
  generateCircleOfSvg({ numPieces: 70, radius: 1130 }),
  generateCircleOfSvg({ numPieces: 75, radius: 1215 }),
]

const mobileCircles = [
  generateCircleOfSvg({ numPieces: 25, radius: 250 }),
  generateCircleOfSvg({ numPieces: 35, radius: 300 }),
  generateCircleOfSvg({ numPieces: 40, radius: 350 }),
]

export default async function Icons() {
  return (
    <>
      <DesktopCircles circles={desktopCircles} />
      <MobileCircles circles={mobileCircles} />
    </>
  )
}
