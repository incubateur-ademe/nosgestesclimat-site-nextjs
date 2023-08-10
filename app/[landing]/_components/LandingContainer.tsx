import { PropsWithChildren } from 'react'

export default function LandingContainer({
	children,
	background,
}: PropsWithChildren<{ background?: boolean }>) {
	return (
		<div
			className={`my-8 py-2 md:my-4 md:py-4 w-full ${
				background ? 'bg-grey-100' : ''
			}`}
		>
			{children}
		</div>
	)
}
