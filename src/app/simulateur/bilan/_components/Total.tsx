import React, { useState } from 'react'

import { useRule } from '@/publicodes-state'
import Planet from './total/Planet'
import ToggleButton from './total/ToggleButton'
import Explanation from './total/Explanation'

export default function Category() {
  const { value } = useRule('bilan')

  const [open, setOpen] = useState(false)
  return (
    <>
      <div className='flex justify-center items-center gap-4 rounded-sm bg-primary text-white text-center p-2 mb-5 '>
        <Planet />
        <div>
          <span className='block font-bold text-3xl'>
            {(value / 1000).toLocaleString('fr-fr', {
              maximumFractionDigits: 1,
            })}{' '}
            tonnes
          </span>
          <span className='block'>
            de CO<sub>2</sub>e / an
          </span>
        </div>
        <ToggleButton setOpen={setOpen} />
      </div>
      {open ? <Explanation setOpen={setOpen} /> : null}
    </>
  )
}
