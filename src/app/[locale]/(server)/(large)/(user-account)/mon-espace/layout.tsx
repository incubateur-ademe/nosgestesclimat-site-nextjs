import { isUserAuthenticated } from '@/helpers/server/model/user'
import { redirect } from 'next/navigation'

/* global LayoutProps */
export default async function Layout({
  children,
}: LayoutProps<'/[locale]/mon-espace'>) {
  if (!(await isUserAuthenticated())) {
    redirect('/connexion')
  }
  return children
}
