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

  let label = ''
  if (!progression) {
    label = 'Faire le test'
  } else if (progression < 1) {
    label = 'Reprendre mon test'
  } else {
    label = 'Voir mes résultats'
  }

  return <ButtonLink href={href}>{label}</ButtonLink>
}
