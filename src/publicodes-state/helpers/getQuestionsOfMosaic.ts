import { DottedName } from '../types'

type Props = {
  dottedName: DottedName
  everyMosaicChildren: string[]
}

export default function getQuestionsOfMosaic({
  dottedName,
  everyMosaicChildren,
}: Props): string[] {
  return (
    everyMosaicChildren.filter((mosaicChild) =>
      mosaicChild.includes(dottedName)
    ) || []
  )
}
