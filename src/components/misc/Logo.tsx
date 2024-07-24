'use client'

import { useIframe } from '@/hooks/useIframe'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import Link from '../Link'

const imageClassSize = {
  sm: 'w-[38px]',
  md: 'w-[50px]',
}
const textClassSize = {
  sm: 'ml-1 text-sm',
  md: 'ml-2 text-lg',
}
type Props = {
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md'
}
export default function Logo({
  onClick = () => null,
  className,
  size = 'md',
}: Props) {
  const { isIframeOnlySimulation } = useIframe()

  return (
    <div className={twMerge('flex items-center', className)}>
      <Link
        href="/"
        onClick={onClick}
        data-cypress-id="home-logo-link"
        className={`flex items-center justify-center no-underline ${
          // @bjlaa : this is a hack to prevent the logo from being clickable in the iframe
          // not a recommended method a11y-wise, but in this case it's a good fit
          isIframeOnlySimulation ? 'pointer-events-none' : ''
        }`}>
        <Image
          src="/images/misc/petit-logo@3x.png"
          alt="Logo Nos Gestes Climat"
          width="200"
          height="200"
          className={twMerge('h-auto', imageClassSize[size])}
        />

        <div
          className={twMerge(
            'origin-left font-extrabold uppercase !leading-[0.85] text-default transition-all duration-500 lg:block',
            textClassSize[size]
          )}>
          <span className="block w-full !leading-[0.85]">Nos</span>
          <span className="block w-full !leading-[0.85]">Gestes</span>
          <span className="block w-full !leading-[0.85]">Climat</span>
        </div>
      </Link>
    </div>
  )
}
