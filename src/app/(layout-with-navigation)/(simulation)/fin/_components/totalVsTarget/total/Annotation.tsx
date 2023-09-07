type Props = {
  content: string
}

export default function Annotation({ content }: Props) {
  return (
    <div className="absolute top-0 left-full ml-12">
      <svg
        width="715"
        height="789"
        viewBox="0 0 715 789"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 absolute right-[90%] top-[110%]">
        <path
          d="M705.874 0.0754395C706.617 681.584 13.0447 708.256 13.0447 708.256M13.0447 708.256L79.5559 602.744M13.0447 708.256L106.529 781.33"
          stroke="black"
          strokeWidth="18.2154"
        />
      </svg>
      <div className="w-52 text-lg bg-white text-center p-4 rounded-lg">
        {content}
      </div>
    </div>
  )
}
