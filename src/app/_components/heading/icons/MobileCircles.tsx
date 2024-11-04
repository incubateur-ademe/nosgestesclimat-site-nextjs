import Image from 'next/image'

export default function MobileCircles() {
  return (
    <Image
      src="/images/misc/mobileIcons.png"
      alt="Des cercles mobiles"
      width="768"
      height="588"
      className="absolute left-1/2 top-1/2 h-[588px] w-[768px] max-w-none -translate-x-1/2 -translate-y-1/2 md:hidden"
      loading="eager"
      priority
    />
  )
}
