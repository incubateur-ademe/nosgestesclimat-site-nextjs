'use client'

import { useIframe } from '@/hooks/useIframe'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import Link from '../Link'

type Props = {
  onClick?: () => void
  className?: string
}
export default function Logo({ onClick = () => null, className }: Props) {
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
          className={'h-auto w-[50px]'}
        />

        <div
          className={
            'ml-2 origin-left text-lg font-extrabold uppercase !leading-[0.85] text-default transition-all duration-500 lg:block'
          }>
          <span className="block w-full !leading-[0.85]">Nos</span>
          <span className="block w-full !leading-[0.85]">Gestes</span>
          <span className="block w-full !leading-[0.85]">Climat</span>
        </div>
      </Link>
    </div>
  )
}
