import { Metadata } from 'next'
import Budget from './_components/Budget'

export const metadata: Metadata = {
  title: 'Budget - Nos Gestes Climat',
  description: 'Informations relatives au budget de Nos Gestes Climat.',
}

export default function BudgetPage() {
  return <Budget />
}
