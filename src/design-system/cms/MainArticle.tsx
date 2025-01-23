import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ImageWithCategory from '@/design-system/cms/ImageWithCategory'
import ColorLine from '@/design-system/layout/ColorLine'

export default function MainArticle({
  imageSrc,
  imageAlt,
  title,
  description,
  category,
  href,
}: {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  category: string
  href: string
}) {
  return (
    <Link href={href} className="mb-20 no-underline">
      <h2 className="relative mb-8 inline-block pb-4 text-2xl font-medium text-default md:text-3xl">
        <Trans>À la une !</Trans>{' '}
        <ColorLine className="bg-rainbow absolute bottom-0 left-[15%] h-[3px] w-[70%] animate-rainbow-slow transition-all md:left-0 md:w-full" />
      </h2>
      <div className="flex flex-col gap-6 rounded-xl bg-heroLightBackground md:flex-row">
        <ImageWithCategory
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          width={500}
          height={500}
          category={category}
          imageClassName="w-full"
          containerClassName="w-full md:w-1/2"
        />

        <div className="flex flex-1 flex-col gap-4 p-4 md:py-6 md:pl-0 md:pr-20">
          <h3 className="mb-0 text-xl font-normal text-default md:text-2xl">
            {title}
          </h3>

          <p
            className="flex-1 text-base text-default"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="flex justify-end">
            <span className="ml-auto inline-block cursor-pointer text-right text-[13px] text-primary-700 underline md:text-right md:text-base">
              <Trans>Lire la suite</Trans>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
