import { useForm } from '@/publicodes-state'

export default function Progress() {
  const { progression } = useForm()

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 bg-primaryDark origin-left transition-transform"
      style={{ transform: `scaleX(${progression})` }}
    />
  )
}
