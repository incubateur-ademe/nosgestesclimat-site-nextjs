import CopyInput from '@/design-system/inputs/CopyInput'
import Title from '@/design-system/layout/Title'
import { useEndPageSharedUrl } from '@/hooks/useEndPageSharedUrl'

export default function ShareBlock() {
  const { sharedUrl } = useEndPageSharedUrl()

  return (
    <div id="share-block" className="">
      <Title tag="h2">Partager mon résultat</Title>

      <CopyInput textToCopy={sharedUrl} textToDisplay={sharedUrl} canShare />
    </div>
  )
}
