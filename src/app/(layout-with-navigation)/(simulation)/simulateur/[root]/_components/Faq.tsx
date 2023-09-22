import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'

export default function Faq() {
  return (
    <div className="mx-auto mb-4 rounded-lg bg-primaryLight p-4 text-center">
      <p>
        <Trans>Une question, un problème ?</Trans>
      </p>
      <Link href="/questions-frequentes">
        <Trans>Découvrez la FAQ !</Trans>
      </Link>
    </div>
  )
}
