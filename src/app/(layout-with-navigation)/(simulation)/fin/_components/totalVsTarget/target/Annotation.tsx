import { PropsWithChildren } from 'react'

export default function Annotation({ children }: PropsWithChildren) {
  return (
    <div className="absolute bottom-[calc(100%+3rem)] left-[2.5rem]">
      <svg
        width="715"
        height="789"
        viewBox="0 0 715 789"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[40%] top-[120%] h-10 w-10 rotate-[-23deg]">
        <path
          d="M705.874 0.0754395C706.617 681.584 13.0447 708.256 13.0447 708.256M13.0447 708.256L79.5559 602.744M13.0447 708.256L106.529 781.33"
          stroke="black"
          strokeWidth="18.2154"
        />
      </svg>
      <div className="flex w-36 items-baseline rounded-lg bg-white px-4 py-2 text-center text-sm md:w-52 md:py-4 md:text-lg">
        {children}
      </div>
    </div>
  )
}
