import Link from '@/components/Link'
import Background from '@/components/landing-pages/Background'
import Trans from '@/components/translation/Trans'
import { fetchCategories } from '@/helpers/blog/fetchCategories'
import Badge from '../layout/Badge'

export default async function AllBlogCategories() {
  const categories = await fetchCategories()

  return (
    <div className="relative mb-10 px-4 py-10 pb-20">
      {/* Helps cover the triangles of white shown because of the perspective change in Background */}
      <div className="absolute -left-1/2 -top-10 h-1/2 w-[200%] bg-heroLightBackground xl:w-[300%]" />

      {/* Add the background along with the tilted colorline */}
      <Background
        className="bg-heroLightBackground"
        withColorLine
        direction="left"
      />

      <div className="relative flex flex-col gap-8 md:mx-auto md:max-w-5xl">
        <h2 className="mb-0 text-2xl md:text-3xl">
          <Trans>Toutes les catégories du blog</Trans>
        </h2>

        <ul className="flex w-full flex-row flex-wrap items-center gap-6">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/blog/${category.slug.toLocaleLowerCase()}`}>
                <Badge size="sm">{category.title}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
