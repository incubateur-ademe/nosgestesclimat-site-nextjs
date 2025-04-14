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
          src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/petit_logo_3x_5b54f9a203.png"
          alt="Logo Nos Gestes Climat"
          width="200"
          height="200"
          className={twMerge('h-auto', imageClassSize[size])}
        />

        <div
          className={twMerge(
            'text-default origin-left leading-[0.85]! font-extrabold uppercase transition-all duration-500 lg:block',
            textClassSize[size]
          )}>
          <span className="block w-full leading-[0.85]! whitespace-normal">
            Nos
          </span>
          <span className="block w-full leading-[0.85]! whitespace-normal">
            Gestes
          </span>
          <span className="block w-full leading-[0.85]! whitespace-normal">
            Climat
          </span>
        </div>
      </Link>
    </div>
  )
}
