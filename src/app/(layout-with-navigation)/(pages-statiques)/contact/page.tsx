import GithubContributionForm from '@/components/misc/GithubContributionForm'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Contact - Nos Gestes Climat',
    description: "Contactez l'équipe de Nos Gestes Climat.",
  })
}

export default function Contact() {
  return (
    <div className="pb-4">
      <Title title={<Trans>Contact</Trans>} />

      <h2>
        🙋‍♀️{' '}
        <Trans i18nKey={'publicodes.Contact.titreQuestion'}>
          J'ai une question
        </Trans>
      </h2>

      <p>
        <Trans i18nKey={'publicodes.Contact.description'}>
          N'hésitez pas à consulter notre{' '}
          <a href="./questions-frequentes">FAQ</a> avant de nous écire, vous y
          trouverez sans doute la réponse à votre question !
        </Trans>
      </p>

      <p>
        <Trans i18nKey={'publicodes.Contact.form'}>
          Pour toute remarque ou question,{' '}
          <strong>
            nous vous recommandons{' '}
            <a href="https://github.com/datagir/nosgestesclimat/issues/new?assignees=&labels=contribution&template=retour-utilisateur.md&title=">
              d'ouvrir un ticket directement sur GitHub
            </a>
          </strong>{' '}
          afin de suivre les échanges plus facilement. Vous pouvez également
          nous envoyer un message via le formulaire de contact ci-dessous.
        </Trans>
      </p>

      <Card className="my-4 flex-row py-4">
        <GithubContributionForm />
      </Card>

      <p>
        <Trans i18nKey={'publicodes.Contact.mail'}>
          Enfin, vous avez la possibilité de nous envoyer un mail à l'adresse{' '}
          <a href="mailto:contact@nosgestesclimat.fr">
            contact@nosgestesclimat.fr
          </a>
          . Cependant, le délais de réponse sera plus long que les solutions
          précédentes.
        </Trans>
      </p>
    </div>
  )
}
