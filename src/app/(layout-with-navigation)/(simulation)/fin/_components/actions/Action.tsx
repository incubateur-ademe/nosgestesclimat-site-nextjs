import { useRule } from '@/publicodes-state'

type Props = {
  action: string
}

export default function Action({ action }: Props) {
  const { title, icons, color, value } = useRule(action)
  return (
    <div className="rounded p-4" style={{ backgroundColor: color }}>
      {icons} {title} : {value}
    </div>
  )
}
