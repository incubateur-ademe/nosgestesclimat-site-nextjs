import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function CTAButton({ progression }: { progression: number }) {
  let href = ''
  if (!progression) {
    href = '/tutoriel'
  } else if (progression < 1) {
    href = '/simulateur/bilan'
  } else {
    href = '/fin'
  }

  let label
  if (!progression) {
    label = <Trans>Faire le test</Trans>
  } else if (progression < 1) {
    label = <Trans>Reprendre mon test</Trans>
  } else {
    label = <Trans>Voir mes résultats</Trans>
  }

  return <ButtonLink href={href}>{label}</ButtonLink>
}
