'use client'

import Total from '@/components/total/Total'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useDebug } from '@/hooks/useDebug'
import { FormProvider } from '@/publicodes-state'
import { useState } from 'react'
import Charts from './_components/Charts'
import Faq from './_components/Faq'
import Form from './_components/Form'
import Summary from './_components/Summary'
import Tracking from './_components/Tracking'

type Props = { params: { root: string } }

export default function Simulateur({ params }: Props) {
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)
  const toggleQuestionList = () =>
    setIsQuestionListOpen((prevIsQuestionListOpen) => !prevIsQuestionListOpen)

  const isDebug = useDebug()

  return (
    <FormProvider root={params.root}>
      <div className="hidden md:block">
        <Title title={<Trans>Votre bilan climat personnel</Trans>} />
      </div>
      <Total toggleQuestionList={toggleQuestionList} />
      <div className={isQuestionListOpen && !isDebug ? 'hidden' : 'block'}>
        <Form />
        <Charts />
      </div>
      <Summary
        toggleQuestionList={toggleQuestionList}
        isQuestionListOpen={isQuestionListOpen}
      />
      <Faq />
      <Tracking />
    </FormProvider>
  )
}
