import Footer from '@/components/layout/Footer'
import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'
import { IsDocumentationClientProvider } from './_contexts/DocumentationStateContext'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <IsDocumentationClientProvider>
      <Main>
        <div className="mx-auto flex max-w-full flex-col items-center justify-center gap-4 px-4 pb-8 md:items-start md:px-8 md:pb-10 md:text-left">
          {children}
        </div>
      </Main>

      <Footer />
    </IsDocumentationClientProvider>
  )
}
