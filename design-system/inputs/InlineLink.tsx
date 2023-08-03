import Link from 'next/link'

type Props = {
	href: string
	className?: string
	title?: string
} & React.PropsWithChildren

export default function InlineLink({
	children,
	href,
	className,
	title,
}: Props) {
	return (
		<Link
			href={href}
			title={title}
			className={`text-violet-950 hover:!text-violet-900 transition-colors underline font-bold inline-block ${className}`}
		>
			{children}
		</Link>
	)
}
