import React from 'react'

import { useForm } from '@/publicodes-state'
import Category from './categories/Category'
import Total from './categories/Total'

export default function Categories() {
	const { categories } = useForm()

	return (
		<div className="mb-4 rounded border border-white p-4">
			<Total />
			<div className="flex flex-wrap gap-4">
				{categories.map((category: any) => (
					<Category key={category} category={category} />
				))}
			</div>
		</div>
	)
}
