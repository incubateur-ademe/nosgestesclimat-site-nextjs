'use client'

import React from 'react'

import { useForm } from '@/publicodes-state'
import Category from './categories/Category'
import Total from './categories/Total'

export default function Categories() {
  const { categories } = useForm()

  return (
    <div className='p-4 mb-4 border border-white rounded'>
      <Total />
      <div className='flex gap-4 flex-wrap'>
        {categories.map((category: any) => (
          <Category key={category} category={category} />
        ))}
      </div>
    </div>
  )
}
