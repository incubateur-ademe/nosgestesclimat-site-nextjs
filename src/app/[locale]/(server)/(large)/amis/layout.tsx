import MainLayoutProviders from '@/app/[locale]/_components/MainLayoutProviders'
import { getUser } from '@/helpers/server/dal/user'

export default async function Layout({
  children,
}: LayoutProps<'/[locale]/amis'>) {
  const { id: initialUserId } = await getUser()

  return (
    <MainLayoutProviders initialUserId={initialUserId}>
      {children}
    </MainLayoutProviders>
  )
}
