import { Metadata } from 'next'
import Content from './_components/Content'

export const metadata: Metadata = {
  title: 'Documentation Contexte Sondage',
  description: "Informations relatives à la création d'un contexte spécifique.",
}

export default function ContextesSondagesPage() {
  return <Content />
}
