'use client'

// A previous version of react-query is used here
import { QueryClient, QueryClientProvider } from 'react-query'

import StatsContent from './_components/StatsContent'

const queryClient = new QueryClient()

export default function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatsContent />
    </QueryClientProvider>
  )
}
