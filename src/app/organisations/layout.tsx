import Footer from '@/components/layout/Footer'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}

      <Footer className="mt-16 bg-white" />
    </>
  )
}
