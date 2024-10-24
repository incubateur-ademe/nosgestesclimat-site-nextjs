import Image from 'next/image'

export default function HeadingIllustration() {
  return (
    <div>
      <Image
        src="/images/misc/home-illustration.svg"
        alt="Illustration"
        width={566}
        height={536}
        loading="eager"
        priority
      />
    </div>
  )
}
