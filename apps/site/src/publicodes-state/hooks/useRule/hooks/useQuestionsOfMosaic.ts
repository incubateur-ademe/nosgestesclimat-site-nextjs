import type {
  DottedName,
  MosaiqueNode,
} from '@incubateur-ademe/nosgestesclimat'

interface Props {
  mosaicNode?: MosaiqueNode
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  dottedName: DottedName
}
export default function useQuestionsOfMosaic({
  mosaicNode,
  everyMosaicChildrenWithParent,
  dottedName,
}: Props) {
  if (!mosaicNode) {
    return {
      questionsOfMosaicFromParent: [],
      aucunOption: undefined,
    }
  }

  const questionsOfMosaicFromParent = everyMosaicChildrenWithParent[dottedName]

  const aucunOption = mosaicNode['option aucun']

  return {
    questionsOfMosaicFromParent,
    aucunOption,
  }
}
