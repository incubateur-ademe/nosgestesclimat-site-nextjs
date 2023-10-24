import { NorthStarValue } from '@/types/northstar'
import Emoji from '../utils/Emoji'
import Button from './Button'

const SMILEYS = ['😕', '😐', '🙂', '😄']

type Props = {
  onClick: (index: NorthStarValue) => void
  disabled?: boolean
}

export default function SmileyGrading({ onClick, disabled }: Props) {
  return (
    <ul className="flex gap-4">
      {SMILEYS.map((smiley, index) => (
        <li key={smiley}>
          <Button
            onClick={() => !disabled && onClick(index as NorthStarValue)}
            color="text"
            className="flex h-[64px] w-[64px] items-center justify-center"
            disabled={disabled}>
            <Emoji className="text-2xl">{smiley}</Emoji>
          </Button>
        </li>
      ))}
    </ul>
  )
}
