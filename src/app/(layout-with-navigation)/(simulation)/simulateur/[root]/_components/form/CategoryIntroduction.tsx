import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useRule } from '@/publicodes-state'

type Props = {
  category: string
  startCategory: any
}

export default function CategoryIntroduction({
  category,
  startCategory,
}: Props) {
  const { title, icons, color } = useRule(category)
  return (
    <div
      className="mb-4 flex flex-col items-center gap-8 rounded-lg p-8"
      style={{ backgroundColor: color }}>
      <h2 className="mb-0 text-center text-3xl text-white">{title}</h2>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-6xl leading-none">
        {icons}
      </div>
      <Button onClick={startCategory}>
        <Trans>Commencer</Trans>
      </Button>
    </div>
  )
}
