"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Properties } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import Image from "next/image"

export const columns: ColumnDef<Properties>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "propertyImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <Image src={row.original.propertyImage || ''} alt="Property" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
    ),
  },
  {
    accessorKey: "propertyCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Code" />
    ),
  },
  {
    accessorKey: "propertyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Name" />
    ),
  },
  {
    accessorKey: "regOwnerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registered Owner" />
    ),
  },
  {
    accessorKey: "titleNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title No." />
    ),
  },
  {
    accessorKey: "landBuilding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Land / Bldg / Improvement" />
    ),
  },
  {
    accessorKey: "lotNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lot No." />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
  },
  {
    accessorKey: "province",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Province" />
    ),
  },
  {
    accessorKey: "zipCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Zip Code" />
    ),
  },
  {
    accessorKey: "classification",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Classification" />
    ),
  },
  {
    accessorKey: "leasableArea",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leasable Area" />
    ),
  },
  {
    accessorKey: "orate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Occupancy Rate" />
    ),
  },
  {
    accessorKey: "taxDecNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Declaration" />
    ),
  },
  {
    accessorKey: "sysUser.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created by" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
