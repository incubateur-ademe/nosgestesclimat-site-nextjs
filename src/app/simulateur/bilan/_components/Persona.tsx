'use client'

import React from 'react'

import { useUser, useEngine } from '@/publicodes-state'

type Props = {
  persona: any
  rules: any
  dottedName: string
}

export default function Persona({ persona, rules, dottedName }: Props) {
  const { getValue } = useEngine({ rules, situation: persona.situation })
  const { initSimulation } = useUser()
  return (
    <div className='p-4 mb-4 border border-white rounded'>
      <h2>
        {persona.nom} ({getValue('bilan')}&nbsp;kgCO2e)
      </h2>
      <p className='text-xs'>{persona.description}</p>
      <button
        className='bg-white disabled:bg-gray-500 text-black px-4 py-2 rounded'
        onClick={() =>
          initSimulation({ situation: persona.situation, persona: dottedName })
        }
      >
        Selectionner
      </button>
    </div>
  )
}
