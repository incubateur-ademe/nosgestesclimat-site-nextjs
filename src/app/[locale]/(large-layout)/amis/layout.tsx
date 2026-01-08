import MainLayoutProviders from '../../_components/MainLayoutProviders'

export default function Layout({ children }: LayoutProps<'/[locale]/amis'>) {
  return <MainLayoutProviders>{children}</MainLayoutProviders>
}
