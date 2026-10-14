import Trans from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Emoji from '@/design-system/utils/Emoji'
import MessageTemplate from '../../../../components/layout/MessageTemplate'

export default function NewsletterSuccessMessage() {
  return (
    <MessageTemplate
      title={
        <>
          <Trans>Confirmation de votre inscription à nos e-mails</Trans>{' '}
          <Emoji>👍</Emoji>
        </>
      }
      description={
        <Trans>
          Votre e-mail a été vérifié, vous êtes bien inscrit à notre infolettre.
        </Trans>
      }
      buttonElement={
        <ButtonLink href="/">
          <Trans>Revenir à la page d'accueil</Trans>
        </ButtonLink>
      }
    />
  )
}
