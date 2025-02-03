import ColorLine from '@/design-system/layout/ColorLine'
import { twMerge } from 'tailwind-merge'

type Props = {
  direction?: 'left' | 'right'
  children?: React.ReactNode
  withColorLine?: boolean
  className?: string
}

export default function Background({
  direction = 'right',
  withColorLine = false,
  className,
}: Props) {
  return (
    <div
      className={twMerge(
        'absolute -left-1/2 top-0 h-full w-[200%] bg-gray-100 transition-transform xl:w-[300%]',
        className
      )}
      style={{
        transform: `perspective(20rem) rotateY(${
          direction === 'right' ? -3 : 3
        }deg)`,
        clipPath: `polygon(0 0, 100% 0, 98% 100%, 2% 100%)`,
      }}>
      {withColorLine && (
        <ColorLine className="bg-rainbow absolute bottom-0 left-0 h-[4px] w-[100%] animate-rainbow-slow transition-all" />
      )}
    </div>
  )
}
