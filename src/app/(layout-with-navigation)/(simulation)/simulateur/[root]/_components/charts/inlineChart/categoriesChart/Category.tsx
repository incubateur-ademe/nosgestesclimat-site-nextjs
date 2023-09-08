import { useRule } from '@/publicodes-state'
import Image from 'next/image'

type Props = {
  category: string
  total: number
  position: 'first' | 'middle' | 'last'
  current: boolean
}

const positionClassNames = {
  first: 'border-r',
  last: 'border-l',
  middle: 'border-x',
}
export default function Category({
  category,
  total,
  position,
  current,
}: Props) {
  const { title, color } = useRule(category)
  const { value } = useRule(
    category === 'transport' ? 'transport . empreinte' : category
  )
  const percent = (value / total) * 100

  return (
    <div
      className={`border-ltransition-all relative flex h-full items-center justify-center border-white ${positionClassNames[position]}`}
      style={{ width: `${percent}%`, backgroundColor: color }}>
      {current ? (
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute  left-1/2 -translate-x-1/2"
          style={{ bottom: 'calc(100% + 0.25rem)' }}>
          <path
            d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z"
            style={{ fill: color }}
          />
        </svg>
      ) : null}
      {percent > 5 ? (
        <Image
          style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
          src={`/images/model/${category}.svg`}
          alt={title}
          width={32}
          height={32}
        />
      ) : null}
    </div>
  )
}
