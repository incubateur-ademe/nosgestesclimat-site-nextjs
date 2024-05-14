import { useCurrentSimulation } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}
export default function Progress({ className }: Props) {
  const { progression } = useCurrentSimulation()

  return (
    <div
      className={twMerge(
        'absolute left-0 right-0 top-full h-0.5 origin-left bg-primary-500 transition-transform lg:bg-primary-200',
        className
      )}
      style={{ transform: `scaleX(${progression})` }}
    />
  )
}
