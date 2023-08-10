import { ElementType, PropsWithChildren } from 'react'

export default function Card({
	children,
	className,
	tag,
	key,
}: PropsWithChildren & {
	className?: string
	tag?: ElementType | string
	key?: string
}) {
	const Tag = tag || 'div'

	return (
		<Tag
			className={`flex bg-white rounded-md border-[1px] border-solid border-gray-200 shadow-sm p-4 list-none ${className}`}
			key={key}
		>
			{children}
		</Tag>
	)
}
