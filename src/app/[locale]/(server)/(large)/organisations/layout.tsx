import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { getInitialUserId } from '@/helpers/server/dal/user'
import { UserProvider } from '@/publicodes-state'
import type { PropsWithChildren } from 'react'

export const generateMetadata = getCommonMetadata({
  title: t('Le calculateur Nos Gestes Climat, pour les organisations'),
  description: t(
    'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
  ),
  alternates: {
    canonical: '/organisations',
  },
})

export default async function Layout({ children }: PropsWithChildren) {
  const initialUserId = await getInitialUserId()
  // @TODO : remove userProvider
  return (
    <QueryClientProviderWrapper>
      <UserProvider initialUserId={initialUserId}>
        <div className="bg-white md:-mt-8">{children}</div>
      </UserProvider>
    </QueryClientProviderWrapper>
  )
}
