import { twMerge } from 'tailwind-merge'

export default function Rainbow({
  className,
  ...props
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return <div className={twMerge('bg-divers-300', className)} {...props} />
}
