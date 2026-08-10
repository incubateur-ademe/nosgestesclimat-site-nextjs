import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'

// Auth-gated pages must never be served from the PPR static shell: the
// `unauthorized` boundary redirect baked into the cached anonymous shell
// would bounce authenticated users between /mon-espace and /connexion.
export const dynamic = 'force-dynamic'

export const generateMetadata = getCommonMetadata({
  title: t('Mon espace - Nos Gestes Climat'),
  description: t(
    'Connectez-vous à votre espace Nos Gestes Climat pour accéder à vos résultats et comparer vos empreintes carbone avec vos proches.'
  ),
  alternates: {
    canonical: '/mon-espace',
  },
})

export default function MonEspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
