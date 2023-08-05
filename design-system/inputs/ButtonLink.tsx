import { ButtonSize } from '@/types/values'
import Link from 'next/link'
import { colorClassNames, sizeClassNames } from './Button'

type Props = {
	href: string
	className?: string
	color?: 'primary' | 'secondary'
	size?: ButtonSize
	onClick?: () => void
} & React.PropsWithChildren

// Create a button component styled with tailwindcss
export default function ButtonLink({
	href,
	children,
	className = '',
	color = 'primary',
	size = 'md',
	onClick,
	...props
}: Props) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className={`inline-flex items-center ${sizeClassNames[size]} font-bold no-underline rounded-md shadow-sm transition-colors border-solid ${colorClassNames[color]} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 disabled:opacity-50 ${className}`}
			{...props}
		>
			{children}
		</Link>
	)
}
