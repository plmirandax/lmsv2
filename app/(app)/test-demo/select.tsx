import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectScrollable() {
  return (
    
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="est">RD Realty Development Corporation</SelectItem>
          <SelectItem value="cst">RD Hardware & Fishing Supply, Inc.</SelectItem>
          <SelectItem value="mst">Price Smart Superstores, Inc.</SelectItem>
          <SelectItem value="pst">RD Pawnshop</SelectItem>
          <SelectItem value="akst">RD Credit</SelectItem>
          <SelectItem value="hst">Penbank</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
