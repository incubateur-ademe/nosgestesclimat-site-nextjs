type Props = {
  direction?: 'left' | 'right'
}

export default function Background({ direction = 'right' }: Props) {
  return (
    <div
      className="absolute -left-1/2 top-0 h-full w-[200%] bg-grey-100 transition-transform"
      style={{
        transform: `perspective(20rem) rotateY(${
          direction === 'right' ? -2 : 2
        }deg)`,
      }}
    />
  )
}
