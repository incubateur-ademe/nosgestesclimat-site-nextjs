'use client'

import { useRule } from '@/publicodes-state'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'

type Props = { question: DottedName }

export default function Question({ question }: Props) {
  const { label } = useRule(question)
  return <li>{label}</li>
}
