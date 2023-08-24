import React from 'react'

type Props = {
  setOpen: Function
}

export default function ToggleButton({ setOpen }: Props) {
  return (
    <button
      onClick={() => setOpen((prevOpen: boolean) => !prevOpen)}
      className='border-2 w-7 h-7 leading-none	font-bold text-lg border-white rounded-full bg-transparent '>
      ?
    </button>
  )
}
