import MainLayoutProviders from '@/app/[locale]/_components/MainLayoutProviders'
import { getInitialUserId } from '@/helpers/server/dal/user'

export default async function Layout({
  children,
}: LayoutProps<'/[locale]/amis'>) {
  const initialUserId = await getInitialUserId()
  return (
    <MainLayoutProviders initialUserId={initialUserId}>
      {children}
    </MainLayoutProviders>
  )
}
