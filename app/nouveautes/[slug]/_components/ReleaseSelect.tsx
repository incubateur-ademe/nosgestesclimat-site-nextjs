'use client'

import { Release } from '@/types/translation'
import { useRouter } from 'next/navigation'
import { getPath } from '../../_helpers/getPath'

type Props = {
	releases: Release[]
	selectedRelease: number
}

export default function ReleaseSelect({ releases, selectedRelease }: Props) {
	const router = useRouter()

	return (
		<select
			className="block md:hidden"
			value={selectedRelease}
			onChange={(evt) => {
				console.log('evt:', evt)
				console.log('target:', evt.target)
				router.push(getPath(Number(evt.target.value), releases))
			}}
		>
			{releases.map(({ name }: { name: string }, index: number) => (
				<option key={index} value={index}>
					{name}
				</option>
			))}
		</select>
	)
}
