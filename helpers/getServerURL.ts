import { headers } from 'next/headers'

export const getServerURL = () => {
	const headersList = headers()
	const domain = headersList.get('x-forwarded-host') || ''
	const protocol = headersList.get('x-forwarded-proto') || ''
	const pathname = headersList.get('x-invoke-path') || ''

	return `${protocol}://${domain}${pathname}`
}
