'use client'

import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation, useFormState } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import TotalFootprintNumber from '../misc/TotalFootprintNumber'
import ButtonBack from './topBar/ButtonBack'
import Category from './topBar/Category'
import Progress from './topBar/Progress'
import TotalButtons from './topBar/TotalButtons'

export default function Total({
  toggleQuestionList,
  toggleBackHomeModal,
  toggleSaveModal,
  simulationMode = true,
  showTotal = false,
}: {
  toggleQuestionList?: () => void
  toggleBackHomeModal?: () => void
  toggleSaveModal?: () => void
  simulationMode?: boolean
  showTotal?: boolean
}) {
  const { isIframe, isIframeOnlySimulation } = useIframe()

  const { currentCategory } = useFormState()

  const currentSimulation = useCurrentSimulation()

  const router = useRouter()

  return (
    <header
      className={twMerge(
        'fixed top-0 z-50 h-16 w-full bg-white',
        !simulationMode && 'static z-0 bg-white'
      )}>
      <div
        className={twMerge(
          'relative flex h-full items-center gap-4 overflow-visible pt-2 pb-3 lg:pt-4 lg:pb-5',
          !simulationMode && 'border-primary-100 border-b'
        )}>
        {simulationMode && <Progress />}

        <div className="mb-0 flex w-full max-w-6xl justify-between overflow-visible pr-4 pl-1 lg:mx-auto lg:px-4">
          <div className="relative flex items-center gap-1 lg:gap-4">
            {simulationMode && !isIframe && !isIframeOnlySimulation && (
              <ButtonBack
                onClick={
                  !currentSimulation.savedViaEmail
                    ? toggleBackHomeModal
                    : () => router.push('/')
                }
              />
            )}
            {showTotal ? (
              <TotalFootprintNumber
                size="lg"
                className="flex-row items-baseline md:gap-1"
              />
            ) : (
              <Category category={currentCategory} />
            )}
          </div>
          {toggleQuestionList ? (
            <TotalButtons
              toggleQuestionList={toggleQuestionList}
              toggleSaveModal={toggleSaveModal}
            />
          ) : null}
        </div>
      </div>
    </header>
  )
}
