export default function NewslettersBlockSkeleton() {
  return (
    <div className="relative w-full animate-pulse rounded-lg border border-primary-100 bg-white p-6 md:w-4/6">
      {/* Title skeleton */}
      <div className="mb-4 h-6 w-full rounded bg-primary-100"></div>

      {/* Subscriber count skeleton */}
      <div className="mb-6 h-4 w-40 rounded bg-primary-100"></div>

      {/* Checkboxes skeletons */}
      <div className="space-y-4">
        <div className="h-5 w-64 rounded bg-primary-100"></div>
        <div className="h-5 w-72 rounded bg-primary-100"></div>
        <div className="h-5 w-80 rounded bg-primary-100"></div>
      </div>

      {/* Email input skeleton */}
      <div className="mt-6 flex items-center gap-4">
        <div className="h-11 flex-1 rounded bg-primary-100"></div>
        <div className="h-11 w-24 rounded bg-primary-100"></div>
      </div>
    </div>
  )
}
