import { headers } from 'next/headers'

export const getServerPathname = () => {
  const headersList = headers()

  return headersList.get('next-url') || ''
}
