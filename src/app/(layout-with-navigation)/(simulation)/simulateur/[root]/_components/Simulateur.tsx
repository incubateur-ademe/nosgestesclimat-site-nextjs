'use client'

import Total from '@/components/total/Total'
import { useDebug } from '@/hooks/useDebug'
import { useState } from 'react'
import Charts from './Charts'
import Form from './Form'
import Summary from './Summary'

export default function Simulateur() {
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)

  const toggleQuestionList = () =>
    setIsQuestionListOpen((prevIsQuestionListOpen) => !prevIsQuestionListOpen)

  const isDebug = useDebug()

  return (
    <>
      <Total toggleQuestionList={toggleQuestionList} />
      <div className={isQuestionListOpen && !isDebug ? 'hidden' : 'block'}>
        <Form />
        <Charts />
      </div>
      <Summary
        toggleQuestionList={toggleQuestionList}
        isQuestionListOpen={isQuestionListOpen}
      />
    </>
  )
}
