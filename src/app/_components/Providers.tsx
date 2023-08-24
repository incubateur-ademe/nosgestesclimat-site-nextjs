import { UserProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export default function Providers({ children }: PropsWithChildren) {
  return <UserProvider forgetSimulations>{children}</UserProvider>
}
