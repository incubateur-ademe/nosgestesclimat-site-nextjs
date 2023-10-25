import { useForm } from '@/publicodes-state'

export default function Progress() {
  const { progression } = useForm()

  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 origin-left bg-primaryDark transition-transform"
      style={{ transform: `scaleX(${progression})` }}
    />
  )
}
