import { PropsWithChildren } from 'react'

export default function Main({
	children,
	maxWidth,
	className,
}: PropsWithChildren<{ maxWidth?: string; className?: string }>) {
	const maxWidthClass = maxWidth ? `max-w-${maxWidth} mx-auto` : ''
	return <main className={`flex flex-col ${maxWidthClass} ${className}`}>{children}</main>
}
