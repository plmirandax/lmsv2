"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Properties } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react";
import { CardDescription, CardTitle } from "@/components/ui/card"
import { SelectSeparator } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Row } from "@tanstack/react-table";

type RowData = Row<Properties>;

const CellComponent = ({ row }: { row: RowData }) => {
  const property = row.original;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(null);

  const handleOpenModal = () => {
    setSelectedProperty(property);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
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
              View Property Details
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex justify-center items-center z-50">
        <Dialog open={isOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[750px]">
            <CardTitle>Edit Property Details
              <CardDescription>Fill in the form below to update property details.</CardDescription>
              <SelectSeparator />
              <div className="flex flex-col items-center justify-center py-4">
                  <div className="flex">
                    <div className="w-1/2 mt-1 pr-4">
                      <Label htmlFor="id" className="text-right">Property ID</Label>
                      <Input id="id" name="id" value={selectedProperty?.id} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="propertyCode" className="text-right">Property Code</Label>
                      <Input id="propertyCode" name="propertyCode" value={selectedProperty?.propertyCode} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="propertyName" className="text-right">Property Name</Label>
                      <Input id="propertyName" name="propertyName" value={selectedProperty?.propertyName || ''} disabled />
                    </div>
                 

                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-1 pr-4">
                      <Label htmlFor="regOwnerName" className="text-right">Registered Owner</Label>
                      <Input id="regOwnerName" name="regOwnerName" value={selectedProperty?.regOwnerName || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="titleNo" className="text-right">Title No.</Label>
                      <Input id="titleNo" name="titleNo" value={selectedProperty?.titleNo || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="lotNo" className="text-right">Lot No.</Label>
                      <Input id="lotNo" name="lotNo" value={selectedProperty?.lotNo || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-1 pr-4">
                      <Label htmlFor="address" className="text-right">Address</Label>
                      <Input id="address" name="address" value={selectedProperty?.address || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="city" className="text-right">City</Label>
                      <Input id="city" name="city" value={selectedProperty?.city || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="province" className="text-right">Province</Label>
                      <Input id="province" name="province" value={selectedProperty?.province || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-1 pr-4">
                      <Label htmlFor="zipCode" className="text-right">Zip Code</Label>
                      <Input id="zipCode" name="zipCode" value={selectedProperty?.zipCode || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="classification" className="text-right">Classification</Label>
                      <Input id="classification" name="classification" value={selectedProperty?.classification || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="leasableArea" className="text-right">Leasable Area</Label>
                      <Input id="leasableArea" name="leasableArea" value={selectedProperty?.leasableArea || ''} disabled />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mt-1 pr-4">
                      <Label htmlFor="orate" className="text-right">Occupancy Rate</Label>
                      <Input id="orate" name="orate" value={selectedProperty?.orate || ''} disabled />
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="taxDecNo" className="text-right">Tax Declaration</Label>
                      <Input id="taxDecNo" name="taxDecNo" value={selectedProperty?.taxDecNo || ''} disabled/>
                    </div>
                    <div className="w-1/2 mt-1 pl-4">
                      <Label htmlFor="sysUser.name" className="text-right">Created by</Label>
                      <Input id="sysUser.name" name="sysUser.name" value={selectedProperty?.sysUser?.name || ''} disabled />
                    </div>
                  </div>
                  {/*<Image src={selectedProperty?.propertyImage || ''} alt="Property" width={400} height={400} className="mt-4 items-center justify-center flex flex-1"/> */}
                </div>
            </CardTitle>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

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
      <DataTableColumnHeader column={column} title="Image" className="pl-4" />
    ),
    cell: ({ row }) => (
      <Image src={row.original.propertyImage || ''} alt="Property" className="ml-4" style={{ width: '30px', height: '30px', borderRadius: '50%' }} width={30} height={30} />
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
    cell: CellComponent, // Use the component you defined above
  },
];