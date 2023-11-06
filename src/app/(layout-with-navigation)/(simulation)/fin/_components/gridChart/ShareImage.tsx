import Image from 'next/image'

export default function ShareImage() {
  return (
    <div className="color-white bg-primary-500 mr-4 flex items-center justify-center rounded-full p-2">
      <Image
        src="/images/misc/share.svg"
        className="-mb-1 h-8 invert"
        width={32}
        height={32}
        alt=""
      />
    </div>
  )
}
