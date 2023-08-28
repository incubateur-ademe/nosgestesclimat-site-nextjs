'use client'

import Title from '@/design-system/layout/Title'
import Charts from './_components/Charts'
import Debug from './_components/Debug'
import Form from './_components/Form'
import Total from './_components/Total'

export default function Simulateur({
  params,
}: {
  params: { dottedName: string[] }
}) {
  return (
    <>
      <Title title={'Votre bilan climat personnel'} />
      <Total />
      <Form params={params} />
      <Charts />
      <Debug />
    </>
  )
}
