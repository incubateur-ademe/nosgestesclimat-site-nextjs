import { headers } from 'next/headers'

export const getServerPathname = () => {
	const headersList = headers()
	const domain = headersList.get('x-forwarded-host') || ''
	const protocol = headersList.get('x-forwarded-proto') || ''
	const pathname = headersList.get('x-invoke-path') || ''
}
