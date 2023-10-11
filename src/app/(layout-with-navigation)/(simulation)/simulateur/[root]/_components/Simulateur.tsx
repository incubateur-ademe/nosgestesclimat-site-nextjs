'use client'

import Total from '@/components/total/Total'
import { useDebug } from '@/hooks/useDebug'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Charts from './simulateur/Charts'
import Form from './simulateur/Form'
import Summary from './simulateur/Summary'

export default function Simulateur() {
  const router = useRouter()

  const isDebug = useDebug()

  const { tutorials } = useUser()

  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)

  const toggleQuestionList = () =>
    setIsQuestionListOpen((prevIsQuestionListOpen) => !prevIsQuestionListOpen)

  const [isInit, setIsInit] = useState(false)
  useEffect(() => {
    if (!tutorials.testIntro && !isDebug) {
      console.log('router replace')
      router.replace('/tutoriel')
    } else {
      setIsInit(true)
    }
  }, [tutorials, router, isDebug])

  if (!isInit) return null
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
