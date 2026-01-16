import MainLayoutProviders from '@/app/[locale]/_components/MainLayoutProviders'

export default function Layout({ children }: LayoutProps<'/[locale]/amis'>) {
  return <MainLayoutProviders>{children}</MainLayoutProviders>
}
