"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import React, { useState } from 'react';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { propertiesSchema } from "../data/schema"


interface DataTableRowActionsProps<TData extends { id: string }> {
  row: Row<TData & { createdAt: Date; updatedAt: Date | null }>;
  onEdit: () => void;
}

export function DataTableRowActions<TData extends { id: string }>({
  row,
}: DataTableRowActionsProps<TData>) {
  // Convert createdAt and updatedAt fields to Date objects
  const originalData = {
    ...row.original,
    createdAt: new Date(row.original.createdAt),
    updatedAt: row.original.updatedAt ? new Date(row.original.updatedAt) : null,
  };

  const task = propertiesSchema.parse(originalData);


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>View Spaces</DropdownMenuItem>
          {/* Add the click handler to the "Edit" menu item */}
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}