import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
  title: ReactNode
  subTitle: ReactNode
  body: ReactNode
  imageSrc: string
}

export default function IllustratedPoint({
  title,
  subTitle,
  body,
  imageSrc,
}: Props) {
  return (
    <section className="flex items-center justify-between gap-8">
      <div className="w-[34rem] max-w-full">
        <h2 className="mb-2 text-base text-pink-600">{title}</h2>

        <h3 className="text-3xl">{subTitle}</h3>

        <p className="text-lg">{body}</p>
      </div>

      <div className="rounded-lg bg-grey-100 p-6">
        <Image width="413" height="400" src={imageSrc} alt="" />
      </div>
    </section>
  )
}
