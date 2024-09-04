export function StepMarkerSkeleton() {
  return (
    <section className="absolute left-0 top-24 flex h-10 w-full items-center justify-center gap-1">
      <div className="h-1 w-full animate-pulse rounded-lg bg-cl_1/60" />
      <div className="h-1 w-full animate-pulse rounded-lg bg-cl_1/60" />
      <div className="h-1 w-full animate-pulse rounded-lg bg-cl_1/60" />
    </section>
  )
}
