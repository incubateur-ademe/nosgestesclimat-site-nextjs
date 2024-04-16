import { useCurrentSimulation } from '@/publicodes-state'

export default function Progress() {
  const { progression } = useCurrentSimulation()

  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 origin-left bg-primary-700 transition-transform"
      style={{ transform: `scaleX(${progression})` }}
    />
  )
}
