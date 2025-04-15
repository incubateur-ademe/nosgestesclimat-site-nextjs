import { twMerge } from 'tailwind-merge'

function FinPageSkeleton() {
  return (
    <div className="relative mt-10 animate-pulse px-4">
      <div className="lg:hidden">
        <div className="bg-primary-100 mb-6 h-8 w-48 rounded-md"></div>
      </div>

      <div className="bg-primary-100 mb-8 h-12 w-full rounded-md"></div>

      <div className="relative flex flex-col-reverse gap-16 lg:flex-row lg:gap-10">
        <div className="relative flex flex-1 flex-col gap-16 lg:mt-7">
          <div className="bg-primary-100 h-48 w-full rounded-md"></div>

          <div className="bg-primary-100 h-24 w-full rounded-md"></div>

          <div className="bg-primary-100 h-24 w-full rounded-md"></div>

          <div>
            <div className="bg-primary-100 mb-4 h-8 w-64 rounded-md"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-primary-100 h-12 w-full rounded-md"></div>
              ))}
            </div>
          </div>

          <div className="bg-primary-100 h-24 w-full rounded-md"></div>

          <div className="bg-primary-100 h-48 w-full rounded-md"></div>
        </div>
        <div
          className={twMerge(
            'short:gap-2 top-40 flex w-full flex-col gap-4 self-start lg:sticky lg:z-30 lg:w-[22rem]',
            'bg-primary-100 h-96 rounded-md'
          )}></div>
      </div>
    </div>
  )
}

export default FinPageSkeleton
