type Props = {
  content: string
}

export default function Annotation({ content }: Props) {
  return (
    <div className="absolute left-full top-0 ml-6 md:ml-12">
      <svg
        width="715"
        height="789"
        viewBox="0 0 715 789"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[90%] top-[110%] h-8 w-8 md:h-12 md:w-12">
        <path
          d="M705.874 0.0754395C706.617 681.584 13.0447 708.256 13.0447 708.256M13.0447 708.256L79.5559 602.744M13.0447 708.256L106.529 781.33"
          stroke="black"
          strokeWidth="18.2154"
        />
      </svg>
      <div className="w-36 rounded-lg bg-white px-4 py-2 text-center text-sm md:w-52 md:py-4 md:text-lg">
        {content}
      </div>
    </div>
  )
}
