import logo from '@/assets/images/petit-logo@3x.png'
import Image from 'next/image'
import Link from '../Link'

export default function Logo({
  size = 'large',
  className,
}: {
  size?: 'small' | 'large'
  className?: string
}) {
  const classnames = {
    small: {
      image: 'h-auto w-[50px]',
      text: 'text-xl',
    },
    large: {
      image: 'h-auto w-[50px] md:w-[100px]',
      text: 'md:text-3xl',
    },
  }

  return (
    <div
      className={`flex w-full items-center justify-center pb-4 pt-8 ${className}`}>
      <Link
        href="/"
        data-cypress-id="home-logo-link"
        className="mx-auto my-1 flex items-center justify-center no-underline md:my-4 lg:mx-auto lg:my-4">
        <Image
          src={logo}
          alt="Logo Nos Gestes Climat"
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
