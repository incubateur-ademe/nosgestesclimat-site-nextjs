import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

interface Props {
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  dottedName: DottedName
}
export default function useQuestionsOfMosaic({
  everyMosaicChildrenWithParent,
  dottedName,
}: Props) {
  const questionsOfMosaicFromParent =
    everyMosaicChildrenWithParent[dottedName] || []

  const questionsOfMosaicFromSibling =
    Object.values(everyMosaicChildrenWithParent).find((mosaicChildren) => {
      return mosaicChildren.includes(dottedName)
    }) || []

  return { questionsOfMosaicFromParent, questionsOfMosaicFromSibling }
}
