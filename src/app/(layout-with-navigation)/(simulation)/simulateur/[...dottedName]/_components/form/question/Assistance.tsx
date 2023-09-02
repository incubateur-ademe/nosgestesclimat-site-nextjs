import { useRule } from '@/publicodes-state'
import { useMemo } from 'react'

type Props = {
  question: string
  assistance: string
}

export default function Assistance({ question, assistance }: Props) {
  const parentRule = useMemo(() => {
    const dottedNameArray = question.split(' . ')
    dottedNameArray.pop()
    return dottedNameArray.join(' . ')
  }, [question])

  const { title } = useRule(parentRule + ' . ' + assistance)

  return <div className=" mb-2 flex flex-wrap gap-2 text-sm">{title}</div>
}
