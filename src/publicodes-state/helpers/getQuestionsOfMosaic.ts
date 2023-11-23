type Props = {
  dottedName: string
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function getQuestionsOfMosaic({
  dottedName,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props): string[] {
  const tempKeyTable = {
    'logement . vacances': 'présent',
    'logement . vacances . résidence secondaire . durée': 'nombre',
  } as Record<string, string>
  return (
    everyMosaicChildWhoIsReallyInMosaic.filter((mosaicChild) => {
      const conditionFromKey =
        tempKeyTable[dottedName] &&
        mosaicChild.includes(tempKeyTable[dottedName])
      return mosaicChild.includes(dottedName) && conditionFromKey
    }) || []
  )
}
