import { useForm } from '@/publicodes-state'
import { useState } from 'react'
import Category from './debug/Category'

export default function Debug() {
  const { categories } = useForm()
  const [open, setOpen] = useState(false)
  return (
    <div className={`mb-4 ${open ? 'rounded border border-primary' : ''} p-4`}>
      <button
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        className="text-xs">
        Debug
      </button>
      {open ? (
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category: any) => (
            <Category key={category} category={category} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
