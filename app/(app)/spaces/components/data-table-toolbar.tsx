"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/(app)/taskmanager/components/data-table-view-options"

import { statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { AddNewSpace } from "@/components/forms/add-new-space"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <AddNewSpace />
        <Input
          placeholder="Filter properties..."
          value={(table.getColumn("spaceCode")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("spaceCode")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        
        {table.getColumn("spaceName") && (
          <DataTableFacetedFilter
            column={table.getColumn("spaceName")}
            title="Status"
            options={statuses}
          />
        )}
        {/*}
        {table.getColumn("regOwnerName") && (
          <DataTableFacetedFilter
            column={table.getColumn("regOwnerName")}
            title="Registered Owner"
            options={priorities}
          />
        )}
        */}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
