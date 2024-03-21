import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonUI() {
  return (
    <div className="flex flex-col space-y-3 h-full overflow-auto">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-2">
          {[...Array(13)].map((_, j) => (
            <Skeleton key={j} className="h-4 w-[100px] flex-grow" />
          ))}
        </div>
      ))}
    </div>
  )
}