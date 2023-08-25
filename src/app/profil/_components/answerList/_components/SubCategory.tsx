'use client'

import Card from '@/design-system/layout/Card'
import { useRule } from '@/publicodes-state'
import { Category } from '@/types/model'
import { useContext, useState } from 'react'
import { AllOpenContext } from '../_contexts/AllOpenContext'
import RecursiveStepsTable from './Recursive.Table'

type Props = {
  ruleDottedName: string
  rules: Category[]
  level: number
}

export default function SubCategory({ ruleDottedName, rules, level }: Props) {
  const rule = useRule(ruleDottedName)

  const [isLocallyOpen, setIsLocallyOpen] = useState(false)

  const isAllOpen = useContext(AllOpenContext)

  const isOpen = isAllOpen || isLocallyOpen

  const isFirstLevel = level === 1

  const categoryClassName = isFirstLevel
    ? `!bg-[${rule.color}] w-[30rem] max-w-full text-white`
    : ''

  return (
    <div>
      <Card
        onClick={() => setIsLocallyOpen(!open)}
        className={`${categoryClassName} cursor-pointer inline-flex justify-start items-center mb-4`}>
        <span role="img" aria-label="category icon" className="mr-2 text-2xl">
          {rule?.icons}
        </span>

        {isFirstLevel ? (
          <h2 className="m-0">{rule.title}</h2>
        ) : (
          <h3 className="m-0">{rule.title}</h3>
        )}

        <div className="ml-auto">
          <small>
            {rules.length}{' '}
            {isFirstLevel && (
              <span role="img" aria-label="Emoji bubble speech">
                💬
              </span>
            )}
          </small>
          <span>{!open ? '▶' : '▼'}</span>
        </div>
      </Card>
      {isOpen && <RecursiveStepsTable rules={rules} level={level} />}
    </div>
  )
}
