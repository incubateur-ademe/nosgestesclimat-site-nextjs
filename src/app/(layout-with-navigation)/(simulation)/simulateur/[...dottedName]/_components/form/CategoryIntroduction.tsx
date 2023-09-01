import TransClient from '@/components/translation/TransClient'
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
      className="rounded-lg p-8 mb-4 flex flex-col items-center gap-8"
      style={{ backgroundColor: color }}>
      <h2 className="text-center text-3xl mb-0 text-white">{title}</h2>
      <div className="text-6xl bg-white rounded-full w-20 h-20 flex justify-center items-center leading-none">
        {icons}
      </div>
      <Button onClick={startCategory}>
        <TransClient>Commencer</TransClient>
      </Button>
    </div>
  )
}
