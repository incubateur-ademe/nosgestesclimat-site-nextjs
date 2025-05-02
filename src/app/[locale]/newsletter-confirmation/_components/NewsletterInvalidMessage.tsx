import Trans from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import MessageTemplate from '../../../../components/layout/MessageTemplate'

export default async function NewsletterInvalidMessage({
  locale,
}: {
  locale: string
}) {
  const { t } = await getServerTranslation({ locale })
  return (
    <MessageTemplate
      title={t("L'invitation a expiré")}
      description={t(
        'Vous devez recommencer votre inscription et valider votre e-mail.'
      )}
      buttonElement={
        <>
          <ButtonLink color="secondary" href="/">
            <Trans locale={locale}>Revenir à la page d'accueil</Trans>
          </ButtonLink>

          <ButtonLink href="/profil#infolettre">
            <Trans locale={locale}>Recommencer mon inscription</Trans>
          </ButtonLink>
        </>
      }
    />
  )
}
