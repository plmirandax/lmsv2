"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tenants } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
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
import Image from "next/image"

type RowData = Row<Tenants>;
const CellComponent = ({ row }: { row: RowData }) => {
  const tenants = row.original;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTenants, setSelectedTenants] = useState<Tenants | null>(null);

  const handleOpenModal = () => {
    setSelectedTenants(tenants);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTenants(null);
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
              View Tenant Details
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex justify-center items-center z-50">
        <Dialog open={isOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[750px]">
            <CardTitle>Tenant Details
              <CardDescription>Fill in the form below to update tenant details.</CardDescription>
              <SelectSeparator />
              <div className="flex flex-col items-center justify-center py-4">
                  <div className="flex">
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="tenantCode" className="text-right">BP Code</Label>
                      <Input id="tenantCode" name="tenantCode" value={selectedTenants?.tenantCode} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="tenantName" className="text-right">Tenant Name</Label>
                      <Input id="tenantName" name="tenantName" value={selectedTenants?.name || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input id="email" name="email" value={selectedTenants?.email || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="contactNo" className="text-right">Contact No.</Label>
                      <Input id="contactNo" name="contactNo" value={selectedTenants?.contactNo || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="address" className="text-right">Address</Label>
                      <Input id="address" name="address" value={selectedTenants?.address || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="city" className="text-right">City</Label>
                      <Input id="city" name="city" value={selectedTenants?.city || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="province" className="text-right">Province</Label>
                      <Input id="province" name="province" value={selectedTenants?.province || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="zipCode" className="text-right">Zip Code</Label>
                      <Input id="zipCode" name="zipCode" value={selectedTenants?.zipCode || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4 pr-4">
                      <Label htmlFor="sysUser.name" className="text-right">Created by</Label>
                      <Input id="sysUser.name" name="sysUser.name" value={selectedTenants?.User?.name || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-6 pr-4">
                      <Button className="item-right flex" variant="outline">
                        <TenantSpaceDetails />
                      </Button>
                    </div>

                    <div className="w-1/2 mt-6 pr-4 ">
                      <Button className="item-right flex pr-4" variant="outline">
                        <UtilityDetails />
                      </Button>
                    </div>
                    <div className="w-1/2 mt-6 pr-4">
                      <Button className="item-right flex pr-4" variant="outline">
                        <TaxDecDetails />
                      </Button>
                    </div>
                    <div className="w-1/2 mt-6 pr-4">
                      <Button className="item-right flex pr-4" variant='outline'>
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

export const columns: ColumnDef<Tenants>[] = [
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
    accessorKey: "tenantImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" className="pl-4" />
    ),
    cell: ({ row }) => (
      <Image src={row.original.tenantImage || ''} alt="Property" className="ml-4"style={{ width: '30px', height: '30px', borderRadius: '50%' }} width={30} height={30} />
    ),
  },
  {
    accessorKey: "tenantCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tenant Code" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "space.spaceName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Space" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "contactNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact No." />
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
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified?" />
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
