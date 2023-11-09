import { useForm } from '@/publicodes-state'

export default function Progress() {
  const { progression } = useForm()

  return (
    <div
      className="bg-primary-500 absolute bottom-0 left-0 right-0 top-0 origin-left transition-transform"
      style={{ transform: `scaleX(${progression})` }}
    />
  )
}
