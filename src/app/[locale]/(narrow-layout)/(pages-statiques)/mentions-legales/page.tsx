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
          name: 'Vercel Inc.',
          address: '440 N Barranca Ave #4133<br/>Covina, CA 91723',
          country: 'États-Unis',
          email: 'privacy@vercel.com',
        }}
      />
    </div>
  )
}
