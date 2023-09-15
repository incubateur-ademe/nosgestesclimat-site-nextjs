import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useRule } from '@/publicodes-state'
import Image from 'next/image'

type Props = {
  category: string
  startCategory: any
}

export default function CategoryIntroduction({
  category,
  startCategory,
}: Props) {
  const { title, color } = useRule(category)
  return (
    <div
      className="mb-4 flex flex-col items-center gap-4 rounded-lg p-8"
      style={{ backgroundColor: color }}>
      <h2 className="mb-0 text-center text-3xl text-white">{title}</h2>
      <Image
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${category}.svg`}
        alt={title || category}
        width={32}
        height={32}
        className="flex h-24 w-24 items-center justify-center rounded-full  leading-none"
      />
      <Button onClick={startCategory}>
        <Trans>Commencer</Trans>
      </Button>
    </div>
  )
}
