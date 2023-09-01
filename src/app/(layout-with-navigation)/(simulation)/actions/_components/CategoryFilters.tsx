import { useRouter } from 'next/navigation'

export default function CategoryFilters({
  categories,
  metric,
  selected,
  countByCategory,
}) {
  const router = useRouter()

  return (
    <ul className="flex flex-wrap list-none justify-center pl-0">
      {categories.map((category) => {
        const getBackgroundColor = () => {
          switch (true) {
            case !countByCategory[category.dottedName]:
              return '#ccc'
            case selected:
              return '#aaa'
            case selected === category.dottedName:
            default:
              return category.color
          }
        }
        return (
          <li
            key={category.dottedName}
            className="rounded-sm height-[1.8rem]"
            style={{
              backgroundColor: getBackgroundColor(),
            }}>
            <button
              className="text-white font-bold"
              onClick={() =>
                setSearchParams(
                  new URLSearchParams({
                    ...(metric ? { métrique: metric } : {}),
                    ...(selected === category.dottedName
                      ? {}
                      : { catégorie: category.dottedName }),
                  })
                )
              }>
              {category.title}{' '}
              <span className="bg-white text-primaryDark rounded-md w-4 inline-block">
                {countByCategory[category.dottedName] || 0}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
