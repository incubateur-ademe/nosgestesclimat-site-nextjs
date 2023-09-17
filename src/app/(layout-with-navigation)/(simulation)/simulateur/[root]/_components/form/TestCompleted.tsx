import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Star from './testCompleted/Star'

export default function TestCompleted() {
  return (
    <div className="mb-4 flex flex-col items-center rounded-lg bg-primaryLight p-4">
      <Star />
      <p className="mb-4 text-lg">
        <Trans>Vous avez terminé le test 👏</Trans>
      </p>
      <ButtonLink href="/fin">
        <Trans>Voir mon résultat</Trans>
      </ButtonLink>
      <p className="mb-0 mt-4 text-lg">ou</p>
      <Link className="mb-4 text-lg" href="/profil">
        Modifier mes réponses
      </Link>
    </div>
  )
}
