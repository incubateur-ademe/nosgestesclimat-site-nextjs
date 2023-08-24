import PageLayout from '@/components/layout/PageLayout'
import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <PageLayout shouldShowMenu>
      <Main className='max-w-[800px] p-8'>{children}</Main>
    </PageLayout>
  )
}
