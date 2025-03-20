import Link from '@/components/Link'
import TransServer from '@/components/translation/trans/TransServer'

export default function SkipToMainContentLink({ locale }: { locale: string }) {
  return (
    <Link
      href="#main-content"
      className="sr-only bg-white focus:relative focus:left-0 focus:top-0 focus:z-[100000] focus:h-auto focus:w-auto focus:border-2 focus:border-primary-700">
      <TransServer locale={locale}>Passer au contenu principal</TransServer>
    </Link>
  )
}
