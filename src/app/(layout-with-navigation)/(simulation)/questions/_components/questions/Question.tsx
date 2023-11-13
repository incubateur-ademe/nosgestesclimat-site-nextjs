'use client'

import { useRule } from '@/publicodes-state'

type Props = { question: string }

export default function Question({ question }: Props) {
  const { label } = useRule(question)
  return <li>{label}</li>
}
