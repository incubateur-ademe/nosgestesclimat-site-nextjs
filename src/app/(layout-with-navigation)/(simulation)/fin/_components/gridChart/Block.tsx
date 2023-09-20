import { useRule } from '@/publicodes-state'
import Image from 'next/image'

type Props = {
  subcategory: string
}
export default function Block({ subcategory }: Props) {
  const { title, color } = useRule(subcategory)

  return (
    <div
      className={`flex h-8 items-center justify-center md:h-10`}
      style={{ backgroundColor: color }}>
      <Image
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${subcategory}.svg`}
        alt={title || 'icône'}
        width={32}
        height={32}
        className="h-6 w-6 md:h-8 md:w-8"
      />
    </div>
  )
}
