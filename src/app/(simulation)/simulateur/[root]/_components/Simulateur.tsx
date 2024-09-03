'use client'

import { useDebug } from '@/hooks/useDebug'
import Form from './simulateur/Form'
import Summary from './simulateur/Summary'

type Props = {
  toggleQuestionList: () => void
  isQuestionListOpen: boolean
}
export default function Simulateur({
  toggleQuestionList,
  isQuestionListOpen,
}: Props) {
  const isDebug = useDebug()

  return (
    <div className={`flex-1 pb-12 pt-20`}>
      <div className={isQuestionListOpen && !isDebug ? 'hidden' : 'block'}>
        <Form />
      </div>
      <Summary
        toggleQuestionList={toggleQuestionList}
        isQuestionListOpen={isQuestionListOpen}
      />
    </div>
  )
}
