
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from '../components/data-table-view-options'

import { statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { AddNewTenant } from '../../../../components/forms/add-new-tenant';
import { downloadToExcel } from "@/lib/xlsx"
import { prisma } from "@/lib/prisma"
import { AiFillFileExcel } from "react-icons/ai"

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
        <AddNewTenant />
        <Input
          placeholder="Filter properties..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        
        {table.getColumn("emailVerified") && (
          <DataTableFacetedFilter
            column={table.getColumn("emailVerified")}
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
      <Button variant="outline" onClick={async () => await downloadToExcel(prisma)} className="h-8 px-2 lg:px-3">Export to Excel <AiFillFileExcel className="ml-2 h-4 w-4"></AiFillFileExcel></Button>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
