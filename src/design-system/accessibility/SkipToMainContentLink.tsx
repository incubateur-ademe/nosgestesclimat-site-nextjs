import Link from '@/components/Link'
import TransServer from '@/components/translation/trans/TransServer'

export default function SkipToMainContentLink({ locale }: { locale: string }) {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:static focus:h-auto focus:w-auto focus:border-2 focus:border-primary-700">
      <TransServer locale={locale}>Passer au contenu principal</TransServer>
    </Link>
  )
}
