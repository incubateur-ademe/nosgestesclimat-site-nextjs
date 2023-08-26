'use client'
import Title from '@/design-system/layout/Title'
import { useForm } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Charts from './_components/Charts'
import Debug from './_components/Debug'
import Form from './_components/Form'
import Total from './_components/Total'

export default function Simulateur() {
  const router = useRouter()

  const { currentQuestion } = useForm()

  useEffect(() => {
    router.push('/simulateur/bilan/' + currentQuestion.split(' . ').join('/'))
  }, [currentQuestion])

  return (
    <>
      <Title title={'Votre bilan climat personnel'} />
      <Total />
      <Form />
      <Charts />
      <Debug />
    </>
  )
}
