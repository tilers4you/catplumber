export default function Loading() {
  return (
    <div
      className="min-h-[60vh] bg-[#F5F5F0] px-4 py-14"
      aria-busy="true"
      aria-label="Loading page content"
    >
      <div className="mx-auto max-w-6xl space-y-8 animate-pulse">
        {/* Hero skeleton */}
        <div className="rounded-2xl bg-white/70 p-8 space-y-4">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-9 w-3/4 rounded-lg bg-gray-200" />
          <div className="h-5 w-1/2 rounded bg-gray-200" />
          <div className="flex gap-3 pt-2">
            <div className="h-11 w-36 rounded-xl bg-gray-200" />
            <div className="h-11 w-36 rounded-xl bg-gray-200" />
          </div>
        </div>

        {/* Cards row skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/70 p-6 space-y-3"
            >
              <div className="h-8 w-8 rounded-lg bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Text block skeleton */}
        <div className="rounded-2xl bg-white/70 p-8 space-y-3">
          <div className="h-5 w-1/3 rounded-lg bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-4/6 rounded bg-gray-200" />
        </div>
      </div>

      {/* Screen-reader only status */}
      <p className="sr-only">Loading, please wait…</p>
    </div>
  );
}
