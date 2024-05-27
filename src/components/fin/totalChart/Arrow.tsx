import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  width?: string
  height?: string
  viewBox?: string
  style?: React.CSSProperties
}

export default function Arrow({ className, ...props }: Props) {
  return (
    <svg
      width="26"
      height="21"
      viewBox="0 0 26 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('fill-secondary-700 stroke-primary-50', className)}
      {...props}>
      <path d="M24.24 0.500002L12.8887 20.0059L1.53745 0.5L24.24 0.500002Z" />
    </svg>
  )
}
