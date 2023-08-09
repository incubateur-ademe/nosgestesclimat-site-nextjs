import { i18nRouter } from 'next-i18n-router'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	return i18nRouter(request, {
		locales: ['fr', 'en-US'],
		defaultLocale: 'fr',
	})
}
