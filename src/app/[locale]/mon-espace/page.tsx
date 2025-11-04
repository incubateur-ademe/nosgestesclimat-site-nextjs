import ContentLarge from '@/components/layout/ContentLarge'
import HeaderServer from '@/components/layout/HeaderServer'
import { CONNEXION_PATH } from '@/constants/urls/paths'
import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'

export default async function MonEspacePage({ params }: DefaultPageProps) {
  const authenticatedUser = await getIsUserAuthenticated()

  if (!authenticatedUser) {
    redirect(CONNEXION_PATH)
  }

  return (
    <>
      <HeaderServer />

      <ContentLarge className="mt-4 px-4 md:mt-10 lg:px-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">🚧 Mon Espace</h1>
        </div>
      </ContentLarge>
    </>
  )
}
