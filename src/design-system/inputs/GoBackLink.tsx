import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'

export default function GoBackLink({ className }: { className?: string }) {
  return (
    <Link
      href="/classements"
      className={`${className} inline-block px-0 !text-[1rem] text-primary-500 no-underline transition-opacity hover:opacity-80`}>
      ← <Trans>Retour</Trans>
    </Link>
  )
}
