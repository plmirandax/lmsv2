import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="flex flex-col">
    <Input
      type="search"
      placeholder="Search..."
      className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px]"
    />
  </div>
  )
}