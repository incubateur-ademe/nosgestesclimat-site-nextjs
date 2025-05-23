function ActionsPageSkeleton() {
  return (
    <div className="mx-auto my-4 mt-10 animate-pulse px-4 pb-4">
      <div className="bg-primary-100 mb-8 h-36 w-full rounded-md"></div>

      <div className="mx-auto grid grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="bg-primary-100 mx-auto h-56 w-48 rounded-md"></div>
        ))}
      </div>
    </div>
  )
}

export default ActionsPageSkeleton
