type Props = {
  direction?: 'left' | 'right'
  children?: React.ReactNode
}

export default function Background({ direction = 'right', children }: Props) {
  return (
    <div
      className="absolute -left-1/2 top-0 h-full w-[200%] bg-grey-100 transition-transform"
      style={{
        transform: `perspective(20rem) rotateY(${
          direction === 'right' ? -2 : 2
        }deg)`,
      }}>
      {children}
    </div>
  )
}
