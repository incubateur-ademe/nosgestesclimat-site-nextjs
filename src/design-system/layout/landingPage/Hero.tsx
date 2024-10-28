import { ReactNode } from 'react'

export default async function Hero({
  illustration,
  content,
  partners,
}: {
  illustration: ReactNode
  content: ReactNode
  partners: ReactNode
}) {
  return (
    <>
      <div className="flex min-h-[588px] items-center bg-primary-50 px-4 py-20 md:min-h-full">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-20">
          <div className="max-w-96">{content}</div>

          {illustration}
        </div>
      </div>

      <div className="flex justify-center md:-mt-10">
        <div className="relative mb-4 flex items-center justify-center gap-6 rounded-full bg-white py-4 md:mb-0 md:gap-8 md:px-24 md:py-10">
          {partners}
        </div>
      </div>
    </>
  )
}
