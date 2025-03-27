import type { ReactNode } from 'react'

export default async function Hero({
  illustration,
  title,
  description,
  partners,
}: {
  illustration: ReactNode
  title: ReactNode
  description: ReactNode
  partners: ReactNode
}) {
  return (
    <>
      <div className="bg-heroLightBackground flex min-h-[588px] items-center px-4 pt-10 pb-20 md:min-h-full md:py-20">
        <div className="relative mx-auto flex max-w-5xl flex-row items-center justify-between gap-8 md:px-0">
          <div className="flex flex-col gap-4 md:gap-10">
            <div className="max-w-[600px] text-center md:text-left">
              <h1 className="mb-0 text-2xl leading-8 md:text-5xl md:leading-[3rem]">
                {title}
              </h1>
            </div>

            <div className="max-w-[600px] text-center text-sm md:order-2 md:text-left md:text-lg">
              {description}
            </div>
          </div>

          <div className="hidden md:block">{illustration}</div>
        </div>
      </div>

      <div className="-mt-6 flex justify-center md:-mt-10">
        <div className="relative mb-4 flex items-center justify-center gap-6 rounded-full bg-white px-12 py-4 md:mb-0 md:gap-8 md:px-24 md:py-10">
          {partners}
        </div>
      </div>
    </>
  )
}
