type Props = {
  dottedName: string
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function getQuestionsOfMosaic({
  dottedName,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props): string[] {
  return (
    everyMosaicChildWhoIsReallyInMosaic.filter((mosaicChild) =>
      mosaicChild.includes(dottedName)
    ) || []
  )
}
