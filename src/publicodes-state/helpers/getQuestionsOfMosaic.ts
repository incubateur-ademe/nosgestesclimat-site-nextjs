import { RuleName } from '@/publicodes-state/types'

type Props = {
  dottedName: RuleName
  everyMosaicChildWhoIsReallyInMosaic: RuleName[]
}

export default function getQuestionsOfMosaic({
  dottedName,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props): RuleName[] {
  return (
    everyMosaicChildWhoIsReallyInMosaic.filter((mosaicChild) =>
      mosaicChild.includes(dottedName)
    ) || []
  )
}
