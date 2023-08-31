import TransClient from '@/components/translation/TransClient'
import Link from 'next/link'

export default function GoBackLink({ className }: { className?: string }) {
  return (
    <Link
      href="/groupes"
      className={`${className} inline-block px-0 !text-[1rem] text-primary no-underline transition-opacity hover:opacity-80`}>
      ← <TransClient>Retour</TransClient>
    </Link>
  )
}
