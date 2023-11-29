import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Container from '@/design-system/layout/Container'

export default function CreateFirstGroupSection() {
  return (
    <Container className="mt-7 bg-gray-100 p-4">
      <h2 className="mb-2 mt-0 text-lg font-medium">
        <Trans>Créez votre premier groupe</Trans>
      </h2>
      <p className="mb-6 text-sm">
        Invitez vos proches pour comparer vos résultats. Cela prend{' '}
        <strong className="text-secondary">1 minute</strong> !
      </p>
      <ButtonLink
        href={'/amis/creer'}
        data-cypress-id="button-create-first-group">
        <Trans>Commencer</Trans>
      </ButtonLink>
    </Container>
  )
}
