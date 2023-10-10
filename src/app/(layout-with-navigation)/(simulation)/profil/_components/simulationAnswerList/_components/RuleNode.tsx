'use client'

import Card from '@/design-system/layout/Card'
import { useRule } from '@/publicodes-state'
import { useContext, useState } from 'react'
import { AllOpenContext } from '../_contexts/AllOpenContext'
import RecursiveRuleNode from './RecursiveRuleNode'

type Props = {
  ruleDottedName: string
  rules: string[]
  level: number
}

export default function RuleNode({ ruleDottedName, rules, level }: Props) {
  const rule = useRule(ruleDottedName)

  const [isLocallyOpen, setIsLocallyOpen] = useState(false)

  const isAllOpen = useContext(AllOpenContext)

  const isOpen = isAllOpen || isLocallyOpen

  const isFirstLevel = level === 1

  return (
    <div className="mb-4 w-full last:mb-0">
      <div
        className={`${
          !isFirstLevel ? 'flex flex-col items-start justify-start' : ''
        }`}>
        <Card
          onClick={() => setIsLocallyOpen(!isOpen)}
          className={`${
            isFirstLevel ? 'w-[35rem] max-w-full px-4 py-6 text-white' : ''
          } inline-flex cursor-pointer !flex-row items-center justify-start `}
          style={isFirstLevel ? { backgroundColor: rule?.color } : {}}>
          <span role="img" aria-label="category icon" className="mr-4 text-2xl">
            {rule?.icons}
          </span>

          {isFirstLevel ? (
            <h2 className="m-0 font-light text-white">
              {rule.title?.split(' ')[0]}
            </h2>
          ) : (
            <h3 className="m-0">{rule.title}</h3>
          )}

          <div
            className={`${
              isFirstLevel ? 'ml-auto text-white' : 'ml-4'
            } flex gap-1`}>
            {rules.length}{' '}
            {isFirstLevel && (
              <span role="img" aria-label="Emoji bubble speech">
                💬
              </span>
            )}
            <span
              className={`ml-2 inline-block ${
                isFirstLevel ? 'text-white' : ''
              }`}>
              {!isOpen ? '▶' : '▼'}
            </span>
          </div>
        </Card>
      </div>
      {isOpen && <RecursiveRuleNode rules={rules} level={level} />}
    </div>
  )
}
