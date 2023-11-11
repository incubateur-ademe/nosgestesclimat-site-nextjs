import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Actions from './_components/Actions'

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

function getLinkList(entries: Record<string, string>): JSX.Element {
  return (
    <ul className="m-0 list-none p-0">
      {Object.entries(entries).map(([linkKey, linkUrl]) => (
        <li key={linkKey}>
          <Link href={linkUrl}>{linkUrl}</Link>
        </li>
      ))}
    </ul>
  )
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
        {getLinkList(links['Nos outils'])}
      </section>

      <section className="mb-2">
        <h2>
          <Trans>Informations</Trans>
        </h2>
        {getLinkList(links['Informations'])}
      </section>

      <section className="mb-2">
        <h2>
          <Trans>Documentations</Trans>
        </h2>
        {getLinkList(links['Documentations'])}
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
