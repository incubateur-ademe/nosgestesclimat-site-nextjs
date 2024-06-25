'use client'
import { PropsWithChildren } from 'react'
// A previous version of react-query is "volontarily" used here
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
