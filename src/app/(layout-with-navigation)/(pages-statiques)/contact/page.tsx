'use client'

import GithubContributionForm from '@/components/GithubContributionForm'
import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'

export default function Contact() {
  return (
    <div className='pb-4'>
      {/*
			<Meta
				title={t('meta.publicodes.Contact.titre')}
				description={t('meta.publicodes.Contact.description')}
			></Meta>
  */}

      <Title title={<TransClient>Contact</TransClient>} />
      <h2>
        🙋‍♀️{' '}
        <TransClient i18nKey={'publicodes.Contact.titreQuestion'}>
          J'ai une question
        </TransClient>
      </h2>
      <p>
        <TransClient i18nKey={'publicodes.Contact.description'}>
          N'hésitez pas à consulter notre{' '}
          <a href='./questions-frequentes'>FAQ</a> avant de nous écire, vous y
          trouverez sans doute la réponse à votre question !
        </TransClient>
      </p>
      <p>
        <TransClient i18nKey={'publicodes.Contact.form'}>
          Pour toute remarque ou question,{' '}
          <strong>
            nous vous recommandons{' '}
            <a href='https://github.com/datagir/nosgestesclimat/issues/new?assignees=&labels=contribution&template=retour-utilisateur.md&title='>
              d'ouvrir un ticket directement sur GitHub
            </a>
          </strong>{' '}
          afin de suivre les échanges plus facilement. Vous pouvez également
          nous envoyer un message via le formulaire de contact ci-dessous.
        </TransClient>
      </p>
      <Card className='my-4 py-4'>
        <GithubContributionForm />
      </Card>
      <p>
        <TransClient i18nKey={'publicodes.Contact.mail'}>
          Enfin, vous avez la possibilité de nous envoyer un mail à l'adresse{' '}
          <a href='mailto:contact@nosgestesclimat.fr'>
            contact@nosgestesclimat.fr
          </a>
          . Cependant, le délais de réponse sera plus long que les solutions
          précédentes.
        </TransClient>
      </p>
    </div>
  )
}
