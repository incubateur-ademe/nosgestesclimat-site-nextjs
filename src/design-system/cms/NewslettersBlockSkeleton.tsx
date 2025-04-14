export default function NewslettersBlockSkeleton() {
  return (
    <div className="border-primary-100 relative w-full animate-pulse rounded-lg border-2 bg-white p-6 md:w-4/6">
      {/* Title skeleton */}
      <div className="bg-primary-100 mb-4 h-6 w-full rounded-sm"></div>

      {/* Subscriber count skeleton */}
      <div className="bg-primary-100 mb-6 h-4 w-40 rounded-sm"></div>

      {/* Checkboxes skeletons */}
      <div className="space-y-4">
        <div className="bg-primary-100 h-5 w-64 rounded-sm"></div>
        <div className="bg-primary-100 h-5 w-72 rounded-sm"></div>
        <div className="bg-primary-100 h-5 w-80 rounded-sm"></div>
      </div>

      {/* Email input skeleton */}
      <div className="mt-6 flex items-center gap-4">
        <div className="bg-primary-100 h-11 flex-1 rounded-sm"></div>
        <div className="bg-primary-100 h-11 w-24 rounded-sm"></div>
      </div>
    </div>
  )
}
