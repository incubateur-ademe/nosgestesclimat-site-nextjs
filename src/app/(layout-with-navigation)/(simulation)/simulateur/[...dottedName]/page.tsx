'use client'
import Title from '@/design-system/layout/Title'
import { useState } from 'react'
import Charts from './_components/Charts'
import Form from './_components/Form'
import Summary from './_components/Summary'
import Total from './_components/Total'

export default function Simulateur() {
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)
  const toggleQuestionList = () =>
    setIsQuestionListOpen((prevIsQuestionListOpen) => !prevIsQuestionListOpen)

  return (
    <>
      <Title title={'Votre bilan climat personnel'} />
      <Total toggleQuestionList={toggleQuestionList} />
      {isQuestionListOpen ? (
        <Summary toggleQuestionList={toggleQuestionList} />
      ) : (
        <>
          <Form />
          <Charts />
        </>
      )}
    </>
  )
}
