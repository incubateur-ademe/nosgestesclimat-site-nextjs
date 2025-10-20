import type { ReactNode } from 'react'
import DownArrow from '../icons/DownArrow'

type Props = {
  highlights: ReactNode[]
}

export default function ColourBlock({ highlights }: Props) {
  return (
    <div className="flex-1 rounded-2xl bg-blue-100 p-16">
      <ul role="list" className="flex max-w-96 flex-col gap-4">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-4">
            <DownArrow className="min-w-10 -rotate-90 fill-black" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  )
}
