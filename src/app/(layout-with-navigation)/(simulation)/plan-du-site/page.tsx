import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Actions from './_components/Actions'
import LinkList from './_components/LinkList'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Plan du site - Nos Gestes Climat',
    description:
      'Retrouvez toutes les pages du site nosgestesclimat.fr pour calculer votre empreinte carbone.',
  })
}

const links = {
  'Nos outils': {
    'publicodes.planDuSite.bilan': '/simulateur/bilan',
    'publicodes.planDuSite.profil': '/profil',
    'publicodes.planDuSite.personas': '/personas',
    'publicodes.planDuSite.actions': '/actions',
    'publicodes.planDuSite.actionsPlus': '/actions/plus',
  },
  Informations: {
    'publicodes.planDuSite.nouveautes': '/nouveautes',
    'publicodes.planDuSite.aPropos': '/a-propos',
    'publicodes.planDuSite.contact': '/contact',
    'publicodes.planDuSite.viePrivee': '/vie-privee',
    'publicodes.planDuSite.partenaires': '/partenaires',
    'publicodes.planDuSite.faq': '/questions-frequentes',
    'publicodes.planDuSite.stats': '/stats',
    Blog: '/blog',
  },
  Documentations: {
    'publicodes.planDuSite.guide': '/guide',
    'publicodes.planDuSite.modele': '/modele',
    'publicodes.planDuSite.documentation': '/documentation',
  },
}

export default function PlanDuSitePage() {
  return (
    <div data-cypress-id="plan-links">
      <Title
        title={
          <Trans i18nKey="publicodes.planDuSite.title">Plan du site</Trans>
        }
      />

      <section className="mb-2">
        <h2>
          <Trans>Nos outils</Trans>
        </h2>
        <LinkList entries={links['Nos outils']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans>Informations</Trans>
        </h2>
        <LinkList entries={links['Informations']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans>Documentations</Trans>
        </h2>
        <LinkList entries={links['Documentations']} />
      </section>

      <section>
        <h2>
          <Trans i18nKey="publicodes.planDuSite.actionsPlus">Les actions</Trans>
        </h2>
        <Actions />
      </section>
    </div>
  )
}
