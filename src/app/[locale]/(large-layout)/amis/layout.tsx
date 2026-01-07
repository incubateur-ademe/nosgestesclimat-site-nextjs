import QueryClientProviderWrapper from '../../_components/mainLayoutProviders/QueryClientProviderWrapper'

export default function Layout({ children }: LayoutProps<'/[locale]/amis'>) {
  return <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
}
