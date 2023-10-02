import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Budget from './_components/Budget'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Budget - Nos Gestes Climat',
    description: 'Informations relatives au budget de Nos Gestes Climat.',
  })
}

export default function BudgetPage() {
  return <Budget />
}
