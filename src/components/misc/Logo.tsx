'use client'

import { useIframe } from '@/hooks/useIframe'
import Image from 'next/image'
import Link from '../Link'

export default function Logo({
  size = 'lg',
  className,
}: {
  size?: 'xs' | 'sm' | 'lg'
  className?: string
}) {
  const { isIframeOnlySimulation } = useIframe()

  const classnames = {
    xs: {
      wrapper: 'pb-2',
      image: 'h-auto w-8 md:w-[50px]',
      text: 'text-xs md:text-xl',
    },
    sm: {
      wrapper: 'pb-4 pt-8',
      image: 'h-auto w-[50px]',
      text: 'text-xl',
    },
    lg: {
      wrapper: 'pb-4 pt-8',
      image: 'h-auto w-[50px] md:w-[100px]',
      text: 'md:text-3xl',
    },
  }

  return (
    <div
      className={`flex w-full items-center justify-center ${classnames[size].wrapper} ${className}`}>
      <Link
        href="/"
        data-cypress-id="home-logo-link"
        className={`mx-auto my-1 flex items-center justify-center no-underline md:my-4 lg:mx-auto lg:my-4 ${
          // @bjlaa : this is a hack to prevent the logo from being clickable in the iframe
          // not a recommended method a11y-wise, but in this case it's a good fit
          isIframeOnlySimulation ? 'pointer-events-none' : ''
        }`}>
        <Image
          src="/images/misc/petit-logo@3x.png"
          alt="Logo Nos Gestes Climat"
          width="200"
          height="200"
          className={classnames[size].image}
        />

        <div
          className={`ml-2 text-lg font-extrabold uppercase !leading-[0.85] text-primaryDark lg:block ${classnames[size].text}`}>
          <span className="block w-full !leading-[0.85]">Nos</span>
          <span className="block w-full !leading-[0.85]">Gestes</span>
          <span className="block w-full !leading-[0.85]">Climat</span>
        </div>
      </Link>
    </div>
  )
}
