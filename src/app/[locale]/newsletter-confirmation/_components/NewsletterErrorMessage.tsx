import Trans from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Emoji from '@/design-system/utils/Emoji'
import MessageTemplate from './MessageTemplate'

export default function NewsletterErrorMessage({ locale }: { locale: string }) {
  return (
    <MessageTemplate
      title={
        <>
          <Trans locale={locale}>Oups, une erreur est survenue</Trans>{' '}
          <Emoji>😬</Emoji>
        </>
      }
      body={
        <Trans locale={locale}>
          Une erreur est survenue, merci de recommencer votre inscription.
        </Trans>
      }
      buttonElement={
        <ButtonLink href="/profil#infolettre">
          <Trans locale={locale}>Recommencer mon inscription</Trans>
        </ButtonLink>
      }
    />
  )
}
