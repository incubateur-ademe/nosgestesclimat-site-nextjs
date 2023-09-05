import { useRule } from '@/publicodes-state'
import Image from 'next/image'

type Props = {
  category: string
  total: number
  position: 'first' | 'middle' | 'last'
}

const positionClassNames = {
  first: 'border-b',
  last: 'border-t',
  middle: 'border-y',
}
export default function Category({ category, total, position }: Props) {
  const { title, color } = useRule(category)
  const { value } = useRule(
    category === 'transport' ? 'transport . empreinte' : category
  )
  const percent = (value / total) * 100

  if (percent < 5) return
  return (
    <div
      className={`relative flex w-full justify-center items-center border-white border-ltransition-all ${positionClassNames[position]}`}
      style={{ height: `${percent}%`, backgroundColor: color }}>
      <Image
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${category}.svg`}
        alt={title}
        width={32}
        height={32}
      />
    </div>
  )
}
