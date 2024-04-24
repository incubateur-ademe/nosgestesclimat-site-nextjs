import ColorLine from '@/design-system/layout/ColorLine'

type Props = {
  direction?: 'left' | 'right'
  children?: React.ReactNode
  withColorLine?: boolean
}

export default function Background({
  direction = 'right',
  withColorLine = false,
}: Props) {
  return (
    <div
      className="absolute -left-1/2 top-0 h-full w-[200%] bg-gray-100 transition-transform"
      style={{
        transform: `perspective(20rem) rotateY(${
          direction === 'right' ? -2 : 2
        }deg)`,
      }}>
      {withColorLine && (
        <ColorLine className="bg-rainbow animate-rainbow-slow absolute bottom-0 left-0 h-[5px] w-[100%] transition-all" />
      )}
    </div>
  )
}
