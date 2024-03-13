import Image from 'next/image'

export default function VisuelIframe() {
  return (
    <div className="relative mx-auto min-h-[15rem] w-2/3 md:min-h-[18rem]">
      <div className="absolute -bottom-[8%] left-[-16%] flex w-full -rotate-[15deg] items-end rounded-t-md bg-white p-2 pb-0 shadow-md">
        <Image
          className="rounded-sm"
          src="/images/organisations/orga-visuel-3.png"
          width="300"
          height="200"
          alt=""
        />
      </div>

      <div className="absolute -bottom-[8%] right-[-16%] flex w-full rotate-[15deg] items-end rounded-t-md bg-white p-2 pb-0 shadow-md">
        <Image
          className="rounded-sm"
          src="/images/organisations/orga-visuel-3.png"
          width="300"
          height="200"
          alt=""
        />
      </div>

      <div className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 items-end rounded-t-md bg-white p-2 pb-0 shadow-md">
        <Image
          className="rounded-sm"
          src="/images/organisations/orga-visuel-3.png"
          width="260"
          height="200"
          alt=""
        />
      </div>
    </div>
  )
}
