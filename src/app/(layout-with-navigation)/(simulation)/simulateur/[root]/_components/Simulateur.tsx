'use client'

import { getBackgroundLightColor } from '@/helpers/getCategoryColorClass'
import { useDebug } from '@/hooks/useDebug'
import { useForm } from '@/publicodes-state'
import { useEffect, useRef } from 'react'
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

  const { currentCategory } = useForm()
  const prevCurrentCategory = useRef<null | string>(null)
  useEffect(() => {
    if (currentCategory !== prevCurrentCategory.current) {
      prevCurrentCategory.current = currentCategory
      console.log('currentCategory', currentCategory)
      document.body.classList.remove(
        `bg-transport-50`,
        `bg-alimentation-50`,
        `bg-logement-50`,
        `bg-divers-50`,
        `bg-servicessocietaux-50`,
        'bg-primary-50',
        'bg-white'
      )
      document.body.classList.add(
        getBackgroundLightColor(currentCategory).replace('-100', '-50')
      )
    }
    return () => {
      document.body.classList.remove(
        `bg-transport-50`,
        `bg-alimentation-50`,
        `bg-logement-50`,
        `bg-divers-50`,
        `bg-servicessocietaux-50`,
        'bg-primary-50',
        'bg-white'
      )
      document.body.classList.add('bg-white')
    }
  }, [currentCategory])
  return (
    <div className="flex-1 lg:mt-3">
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
