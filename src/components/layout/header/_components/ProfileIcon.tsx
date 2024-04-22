'use client'

import { useBackgroundSyncSimulation } from '@/hooks/simulation/useBackgroundSyncSimulation'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const PATH_LENGTH = 70.69577026367188

export default function ProfileIcon({ className }: { className?: string }) {
  const { isSyncedWithBackend, saveDelay } = useBackgroundSyncSimulation()

  const [initAnimation, setInitAnimation] = useState(isSyncedWithBackend)

  useEffect(() => {
    if (!isSyncedWithBackend) {
      setInitAnimation(true)
    }
  }, [isSyncedWithBackend])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (initAnimation) {
      timeout = setTimeout(() => setInitAnimation(false), 500)
    }
    return () => timeout && clearTimeout(timeout)
  }, [initAnimation])

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(
        'inline-block stroke-default stroke-[1.5]',
        className
      )}>
      {/*
      Icône du set d'icônes utilisé sur le site
      laissée de côté pour préserver l'animation de Flocon en attendant d'une prise de décision
      qui n'heurte pas les sensibilités de chacun·es
        <path
          d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      */}
      <g>
        <path
          d="M12 15C14.8995 15 17.25 12.6495 17.25 9.75C17.25 6.85051 14.8995 4.5 12 4.5C9.10051 4.5 6.75 6.85051 6.75 9.75C6.75 12.6495 9.10051 15 12 15Z"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M18.9129 20.876C18.0071 19.9646 16.93 19.2412 15.7436 18.7476C14.5572 18.254 13.2849 17.9999 11.9999 17.9999C10.7149 17.9999 9.44261 18.254 8.25619 18.7476C7.06978 19.2412 5.9927 19.9646 5.08691 20.876"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25Z"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: PATH_LENGTH,
            strokeDashoffset: initAnimation ? PATH_LENGTH : 0,
            transition: `stroke-dashoffset ${initAnimation ? 0 : saveDelay}ms`,
          }}
          fill="none"
        />
      </g>
      <defs>
        <clipPath id="clip0_3151_4681">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
