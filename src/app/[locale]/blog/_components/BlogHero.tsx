import Image from 'next/image'

export default function BlogHero({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: { url: string; alternativeText: string }
}) {
  return (
    <div className="my-20 flex flex-col justify-between gap-8 overflow-x-hidden md:flex-row">
      <div className="md:max-w-[36rem]">
        <h1
          data-cypress-id="blog-title"
          className="text-3xl md:text-5xl"
          dangerouslySetInnerHTML={{ __html: title ?? '' }}
        />

        <p
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: description ?? '' }}
        />
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={image?.url ?? ''}
          width="350"
          height="400"
          alt={image?.alternativeText ?? ''}
        />
      </div>
    </div>
  )
}
