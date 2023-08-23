import React from 'react'
import Link from 'next/link'

import { useUser } from '@/publicodes-state'

export default function Header() {
	const { user, simulations, currentSimulation, setCurrentSimulation } =
		useUser()
	return (
		<div className="mb-4 flex justify-between rounded border border-white p-4 text-xs">
			<div className="flex gap-4 underline">
				<Link href="/">Home</Link>
				<Link href="/personas">Personas</Link>
				<Link href="/user">User</Link>
			</div>
			<div className="flex gap-4">
				<select
					className="px-4 py-1 text-black"
					value={currentSimulation}
					onChange={(event) => setCurrentSimulation(event.currentTarget.value)}
				>
					{simulations.map((simulation: any) => (
						<option key={simulation.id} value={simulation.id}>
							{simulation.persona || simulation.id} (
							{new Date(simulation.date).toLocaleTimeString()})
						</option>
					))}
				</select>
				<div>
					{user.name} {user.email ? <>({user.email})</> : null}
				</div>
			</div>
		</div>
	)
}
