'use client'

import React from 'react'

import Title from '@/design-system/layout/Title'
import Total from './_components/Total'
import Categories from './_components/Categories'
import Form from './_components/Form'

export default function Simulateur() {
  return (
    <>
      <Title title={'Votre bilan climat personnel'} />
      <Total />
      <Form />
      <Categories />
    </>
  )
}
