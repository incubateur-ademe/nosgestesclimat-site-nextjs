'use client'

import { useState } from 'react'

import TransClient from '@/components/translation/TransClient'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm } from '@/publicodes-state'
import CategoryTable from './_components/CategoryTable'
import { AllOpenProvider } from './_contexts/AllOpenContext'

export default function AnswerList() {
  const [isAllOpen, setIsAllOpen] = useState(false)

  const { t } = useClientTranslation()

  const { progression } = useForm()

  if (progression === 0) return null

  return (
    <AllOpenProvider value={isAllOpen}>
      <div className="flex items-center justify-between w-[30rem] gap-2 mb-4">
        <h2 className="mb-0">
          <TransClient>📋 Mes réponses</TransClient>
        </h2>

        <div className="flex items-center">
          <CheckboxInputGroup
            name="unfoldAnswerList"
            label={isAllOpen ? t('Tout replier') : t('Tout déplier')}
            value={isAllOpen}
            onChange={() => setIsAllOpen(!isAllOpen)}
          />
        </div>
      </div>
      <CategoryTable />
    </AllOpenProvider>
  )
}
