import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

export const generateMetadata = getCommonMetadata<
  DefaultPageProps<{ params: { orgaSlug: string } }>
>({
  title: 'Mon espace organisation - Nos Gestes Climat',
  description:
    'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.',
  alternates: ({ orgaSlug }) => ({
    canonical: `/organisations/${orgaSlug}`,
  }),
})

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>
}
