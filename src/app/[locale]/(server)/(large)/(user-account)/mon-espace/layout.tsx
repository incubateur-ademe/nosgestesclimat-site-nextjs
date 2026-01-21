import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import { redirect } from 'next/navigation'

export const generateMetadata = getCommonMetadata({
  title: t('Mon espace - Nos Gestes Climat'),
  description: t(
    'Connectez-vous à votre espace Nos Gestes Climat pour accéder à vos résultats et comparer vos empreintes carbone avec vos proches.'
  ),
})

/* global LayoutProps */
export default async function Layout({
  children,
}: LayoutProps<'/[locale]/mon-espace'>) {
  if (!(await isUserAuthenticated())) {
    redirect('/connexion')
  }
  return children
}
