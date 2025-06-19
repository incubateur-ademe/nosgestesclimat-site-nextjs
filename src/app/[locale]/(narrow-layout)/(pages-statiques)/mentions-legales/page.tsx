import InlineLink from '@/design-system/inputs/InlineLink'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { LegalNotice } from '@incubateur-ademe/legal-pages-react/LegalNotice'

export const generateMetadata = getCommonMetadata({
  title: t('Mentions légales - Nos Gestes Climat'),
  description: t('Mentions légales du site Nos Gestes Climat.'),
  alternates: {
    canonical: '/mentions-legales',
  },
})

export default function MentionsLegalesPage() {
  return (
    <div className="markdown">
      <LegalNotice
        includeBetaGouv
        contactEmail="contact@nosgestesclimat.fr"
        siteName="Nos Gestes Climat"
        siteUrl="https://nosgestesclimat.fr"
        licenceUrl="https://github.com/incubateur-ademe/nosgestesclimat-site-nextjs/blob/main/LICENSE"
        privacyPolicyUrl="/politique-de-confidentialite"
        siteHost={{
          name: 'Scalingo',
          address: '13 RUE JACQUES PEIROTES, 67000 STRASBOURG',
          country: 'France',
          email: 'support@scalingo.com',
        }}
      />
      <h2>13. Conditions d’utilisation des données Base Empreinte</h2>
      <p>
        L’application Nos Gestes Climat offre un accès aux jeux données qui sont
        des résultats d'évaluation du cycle de vie multicritères ou monocritères
        GES provenant notamment de la Base Empreinte® et d’autres fournisseurs
        de données. Ces jeux de données sont utilisés pour la réalisation des
        calculs d’empreinte environnementale
        <ul>
          <li>
            Les jeux de données Base Carbone®, qui sont des résultats
            d'évaluation du cycle de vie monocritère GES (ou facteurs
            d’émissions GES), pour la réalisation de bilans gaz à effet de serre
            (réglementaires et volontaires) pour les organisations (entreprises,
            collectivités...) ;
          </li>
          <li>
            Les jeux de données Base IMPACTS®, qui sont des résultats
            d'évaluation du cycle de vie multicritères, pour l’affichage
            environnemental français (AE) ainsi qu’à l’éco-conception ;
          </li>
          <li>
            Les jeux données Base Empreinte® qui sont des résultats
            d'évaluation du cycle de vie multicritères provenant majoritairement
            de la base de données ecoinvent et d’autres fournisseurs de données.
          </li>
        </ul>
      </p>
      <p>
        Ces jeux de données sont utilisés pour la réalisation de bilans gaz à
        effet de serre des organisations, la règlementation information GES des
        prestations de transport, l’affichage environnemental français,
        l’écoconception et l’évaluation de projets.
      </p>
      <p>
        L’ADEME est le propriétaire des droits de propriété intellectuelle
        portant tant sur la structure que sur le contenu du site mais Base
        Empreinte est concessionnaire des jeux de données ecoinvent, qui sont de
        la propriété d’ecoinvent. L’utilisation de ces données est soumise aux
        conditions d’utilisation présentées dans{' '}
        <InlineLink href="/mentions-legales-base-empreinte">
          les mentions légales dédiées
        </InlineLink>
        .
      </p>
    </div>
  )
}
