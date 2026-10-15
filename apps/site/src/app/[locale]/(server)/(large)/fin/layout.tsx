import UserSpaceTabs from '@/components/layout/UserSpaceTabs'
import { getUserSession } from '@/services/auth/get-user-session'

export default async function Layout({
  children,
}: LayoutProps<'/[locale]/fin'>) {
  const user = await getUserSession()

  return (
    <div>
      <UserSpaceTabs isAuth={user?.isAuth ?? false} />
      {children}
    </div>
  )
}
