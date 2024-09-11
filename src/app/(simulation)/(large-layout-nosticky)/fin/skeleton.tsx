import { twMerge } from 'tailwind-merge'

function FinPageSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="lg:hidden">
        <div className="mb-6 h-8 w-48 rounded-md bg-primary-100"></div>
      </div>

      <div className="mb-8 h-12 w-full rounded-md bg-primary-100"></div>

      <div className="relative flex flex-col-reverse gap-16 lg:flex-row lg:gap-10">
        <div className="relative flex flex-1 flex-col gap-16 lg:mt-7">
          <div className="h-48 w-full rounded-md bg-primary-100"></div>

          <div className="h-24 w-full rounded-md bg-primary-100"></div>

          <div className="h-24 w-full rounded-md bg-primary-100"></div>

          <div>
            <div className="mb-4 h-8 w-64 rounded-md bg-primary-100"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-12 w-full rounded-md bg-primary-100"></div>
              ))}
            </div>
          </div>

          <div className="h-24 w-full rounded-md bg-primary-100"></div>

          <div className="h-48 w-full rounded-md bg-primary-100"></div>
        </div>
        <div
          className={twMerge(
            'top-40 flex w-full flex-col gap-4 self-start lg:sticky lg:z-30 lg:w-[22rem] short:gap-2',
            'h-96 rounded-md bg-primary-100'
          )}></div>
      </div>
    </div>
  )
}

export default FinPageSkeleton
