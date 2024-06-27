import { DottedName } from '@/publicodes-state/types'

type Props = {
  everyMosaicChildrenWithParent: Record<string, string[]>
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
