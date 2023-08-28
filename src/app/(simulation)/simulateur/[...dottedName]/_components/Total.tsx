import Link from 'next/link'
import { useState } from 'react'

import QuestionButton from '@/components/misc/QuestionButton'
import { useRule } from '@/publicodes-state'
import Explanation from './total/Explanation'
import Planet from './total/Planet'
import Progress from './total/Progress'
import ValueChangeDisplay from './total/ValueChangeDisplay'

export default function Total() {
  const { value } = useRule('bilan')

  const [open, setOpen] = useState(false)

  return (
    <div className="mb-2">
      <div className="relative flex justify-center items-center gap-4 rounded-lg overflow-hidden bg-primary text-white text-center p-2 mb-2 ">
        <Progress />
        <Planet />
        <Link
          href="/fin"
          className="no-underline	text-white hover:text-white z-10">
          <span className="block font-bold text-3xl">
            {(value / 1000).toLocaleString('fr-fr', {
              maximumFractionDigits: 1,
            })}{' '}
            tonnes
          </span>
          <span className="block">
            de CO<sub>2</sub>e / an
          </span>
        </Link>
        <QuestionButton
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          color="white"
        />
        <ValueChangeDisplay />
      </div>
      {open ? <Explanation setOpen={setOpen} /> : null}
    </div>
  )
}
