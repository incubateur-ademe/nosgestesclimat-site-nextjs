'use client'

<<<<<<<< HEAD:src/app/(layout-with-navigation)/(simulation)/simulateur/[root]/page.tsx
========
import Total from '@/components/total/Total'
>>>>>>>> main:src/app/(layout-with-navigation)/(simulation)/(layout-with-form-provider)/simulateur/[root]/page.tsx
import Title from '@/design-system/layout/Title'
import FormProvider from '@/publicodes-state/formProvider'
import { useState } from 'react'
import Charts from './_components/Charts'
import Form from './_components/Form'
import Summary from './_components/Summary'

type Props = { params: { root: string } }

export default function Simulateur({ params }: Props) {
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)
  const toggleQuestionList = () =>
    setIsQuestionListOpen((prevIsQuestionListOpen) => !prevIsQuestionListOpen)

  return (
    <FormProvider
      root={params.root}
      categoryOrder={[
        'transport',
        'alimentation',
        'logement',
        'divers',
        'services sociétaux',
      ]}>
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
    </FormProvider>
  )
}
