import { PropsWithChildren } from 'react'

export default function Main({
	children,
	maxWidth,
}: PropsWithChildren<{ maxWidth?: string }>) {
	const maxWidthClass = maxWidth ? `max-w-${maxWidth} mx-auto` : ''
	return <main className={`flex flex-col ${maxWidthClass}`}>{children}</main>
}
