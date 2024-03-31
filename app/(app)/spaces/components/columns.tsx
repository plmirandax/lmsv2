"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Spaces } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import Image from "next/image"
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { SelectSeparator } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UtilityDetails } from "@/components/forms/utility-details"
import { TaxDecDetails } from "@/components/forms/tax-dec"
import { TenantSpaceDetails } from "@/components/forms/space-details"
import { TenantsBillingDetails } from "@/components/forms/billings-tenant"


type RowData = Row<Spaces>;

const CellComponent = ({ row }: { row: RowData }) => {
  const spaces = row.original;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpaces, setSelectedSpaces] = useState<Spaces | null>(null);

  const handleOpenModal = () => {
    setSelectedSpaces(spaces);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSpaces(null);
    setIsOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className="w-8 h-8 p-0">
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleOpenModal}>
              View Space Details
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex justify-center items-center z-50">
        <Dialog open={isOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[750px]">
            <CardTitle>Edit Space Details
              <CardDescription>Fill in the form below to update space details.</CardDescription>
              <SelectSeparator />
              <div className="flex flex-col items-center justify-center py-4">
                  <div className="flex">
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="spaceCode" className="text-right">Space Code</Label>
                      <Input id="spaceCode" name="spaceCode" value={selectedSpaces?.spaceCode} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="spaceName" className="text-right">Space Name</Label>
                      <Input id="spaceName" name="spaceName" value={selectedSpaces?.spaceName || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="status" className="text-right">Status</Label>
                      <Input id="status" name="status" value={selectedSpaces?.oStatus || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="city" className="text-right">Ground Floor</Label>
                      <Input id="city" name="city" value={selectedSpaces?.gFloorArea || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="province" className="text-right">Mezzanine Floor</Label>
                      <Input id="province" name="province" value={selectedSpaces?.mezFloor || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="zipCode" className="text-right">Second Floor</Label>
                      <Input id="zipCode" name="zipCode" value={selectedSpaces?.secFloor || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="sysUser.name" className="text-right">Third Floor</Label>
                      <Input id="sysUser.name" name="sysUser.name" value={selectedSpaces?.thirdFloor || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="sysUser.name" className="text-right">Roof Top</Label>
                      <Input id="sysUser.name" name="sysUser.name" value={selectedSpaces?.roofTop || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="sysUser.name" className="text-right">Total Area</Label>
                      <Input id="sysUser.name" name="sysUser.name" value={selectedSpaces?.totalArea || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="sysUser.name" className="text-right">Monthly Rent</Label>
                      <Input id="sysUser.name" name="sysUser.name" value={selectedSpaces?.monthlyRent || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-6 pl-4">
                      <Button className="item-right flex" variant="outline">
                        <TenantSpaceDetails />
                      </Button>
                    </div>

                    <div className="w-1/2 mt-6 pl-4 ">
                      <Button className="item-right flex" variant="outline">
                        <UtilityDetails />
                      </Button>
                    </div>
                    <div className="w-1/2 mt-6 pl-4">
                      <Button className="item-right flex" variant="outline">
                        <TaxDecDetails />
                      </Button>
                    </div>
                    <div className="w-1/2 mt-6 pl-4 pr-4">
                      <Button className="item-right flex" variant='outline'>
                        <TenantsBillingDetails />
                      </Button>
                    </div>
                  </div>
                  {/* <Image src={selectedTenants?.tenantImage || ''} alt="Property" width={400} height={400} className="mt-4 items-center justify-center flex flex-1"/> */}
                </div>
            </CardTitle>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export const columns: ColumnDef<Spaces>[] = [
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
    accessorKey: "spacesImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" className="pl-4" />
    ),
    cell: ({ row }) => (
      <Image src={row.original.spacesImage || ''} alt="Property" className="ml-4" style={{ height: '30px', borderRadius: '50%' }} width={30}height={30} />
    ),
  },
  {
    accessorKey: "spaceCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Space Code" />
    ),
  },
  {
    accessorKey: "spaceName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Space Name" />
    ),
  },
  {
    accessorKey: "property.propertyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Name" />
    ),
  },
  {
    accessorKey: "oStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "gFloorArea",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ground Floor" />
    ),
  },
  {
    accessorKey: "mezFloor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mezzanine Floor" />
    ),
  },
  {
    accessorKey: "secFloor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Second Floor" />
    ),
  },
  {
    accessorKey: "thirdFloor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Third Floor" />
    ),
  },
  {
    accessorKey: "roofTop",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roof Top" />
    ),
  },
  {
    accessorKey: "totalArea",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Area" />
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
    cell: CellComponent, // Use the component you defined above
  },
]
