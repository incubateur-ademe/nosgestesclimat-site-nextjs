import { ReactNode } from 'react'

type Props = {
  title: ReactNode
  subTitle: ReactNode
  body: ReactNode
  image: ReactNode
}

export default function IllustratedPoint({
  title,
  subTitle,
  body,
  image,
}: Props) {
  return (
    <section className="flex items-center justify-between gap-8">
      <div className="w-[34rem] max-w-full">
        <h2 className="mb-2 text-base text-pink-600">{title}</h2>

        <h3 className="text-3xl">{subTitle}</h3>

        <p className="text-lg">{body}</p>
      </div>

      <div className="flex min-w-[26rem] max-w-full items-end overflow-hidden rounded-lg bg-grey-100 px-6 pt-6">
        {image}
      </div>
    </section>
  )
}
