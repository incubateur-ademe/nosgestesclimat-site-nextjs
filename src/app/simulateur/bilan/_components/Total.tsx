import { useState } from 'react'

import { useRule } from '@/publicodes-state'
import Explanation from './total/Explanation'
import Planet from './total/Planet'
import Progress from './total/Progress'
import ToggleButton from './total/ToggleButton'

export default function Category() {
  const { value } = useRule('bilan')

  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="relative flex justify-center items-center gap-4 rounded-sm bg-primary text-white text-center p-2 mb-5 ">
        <Progress />
        <Planet />
        <div className="z-10">
          <span className="block font-bold text-3xl">
            {(value / 1000).toLocaleString('fr-fr', {
              maximumFractionDigits: 1,
            })}{' '}
            tonnes
          </span>
          <span className="block">
            de CO<sub>2</sub>e / an
          </span>
        </div>
        <ToggleButton setOpen={setOpen} />
      </div>
      {open ? <Explanation setOpen={setOpen} /> : null}
    </>
  )
}
