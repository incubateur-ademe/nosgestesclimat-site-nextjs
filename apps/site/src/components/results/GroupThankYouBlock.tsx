import Trans from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/buttons/ButtonLink'

interface Props {
  group: { name: string; href: string }
}

export default function GroupThankYouBlock({ group }: Props) {
  const groupName = group.name
  return (
    <section
      className="mb-8 rounded-2xl bg-pink-100 px-8 py-10 text-center md:mb-12"
      data-testid="poll-confirmation-block">
      <p className="mb-1 text-lg font-bold">
        <Trans i18nKey="results.groupThankYou.title">
          Merci d'avoir complété le test !
        </Trans>
      </p>

      <p className="mb-6 text-gray-700">
        <Trans
          i18nKey="results.groupThankYou.description"
          values={{ groupName }}>
          Découvrez les résultats du test collectif{' '}
          <strong>"{{ groupName } as unknown as React.ReactElement}"</strong>
        </Trans>
      </p>

      <ButtonLink
        href={group.href}
        color="primary"
        size="md"
        data-testid="see-group-result-button">
        <Trans i18nKey="results.groupThankYou.cta">Voir les résultats</Trans>
      </ButtonLink>
    </section>
  )
}
