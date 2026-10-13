import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_SETTINGS_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Emoji from '@/design-system/utils/Emoji'
import MessageTemplate from '../../../../components/layout/MessageTemplate'

export default function NewsletterErrorMessage() {
  return (
    <MessageTemplate
      title={
        <>
          <Trans>Oups, une erreur est survenue</Trans> <Emoji>😬</Emoji>
        </>
      }
      description={
        <Trans>
          Une erreur est survenue, merci de recommencer votre inscription.
        </Trans>
      }
      buttonElement={
        <ButtonLink href={MON_ESPACE_SETTINGS_PATH}>
          <Trans>Recommencer mon inscription</Trans>
        </ButtonLink>
      }
    />
  )
}
