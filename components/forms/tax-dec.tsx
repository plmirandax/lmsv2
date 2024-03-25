import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Image from "next/image"
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

interface User {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;

}

export function TaxDecDetails() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [userData, setUserData] = useState<User | null>(null);
    const [name, setName] = useState("");

    useEffect(() => {
      if (!loading && session) {
        fetch('/api/fetchUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'success') {
              setUserData(data.user);
              setName(data.user.name);
            } else {
              console.error(data.message);
            }
          });
      }
    }, [loading, session]);

    if (loading) {
      return null;
    }

  return (
    <Sheet>
            <SheetTrigger asChild>
        <Button variant="outline" className="bg-transparent border-none">Tenant RPT Details</Button>
      </SheetTrigger>
      <SheetContent>
     <SheetHeader>
        <SheetTitle>Real Property Tax</SheetTitle>
        <SheetDescription>
          View your Real Property Tax Details
        </SheetDescription>
    </SheetHeader>
  <div className="flex flex-col items-center justify-center gap-4 py-4">
    <Separator />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">
              Lot No.
            </Label>
            <Input id="name" value={name} className="col-span-3" onChange={e => setName(e.target.value)} readOnly/>
            <Label htmlFor="email">
              TD No.
            </Label>
            <Input id="email" value={session?.user?.email || ''} className="col-span-3 text-xs" readOnly />
            <Label htmlFor="role">
              Survey No.
            </Label>
            <Input id="role" value={userData?.role || ''} className="col-span-3" readOnly />
            <Label htmlFor="createdAt" className="text-sm">
              Tax Payer Name
            </Label>
            <Input id="createdAt" value={userData ? new Date(userData.createdAt).toLocaleString() : ''} className="col-span-3" readOnly />
            <Label htmlFor="updatedAt" className="text-sm">
              PIN No.
            </Label>
            <Input id="updatedAt" value={userData?.updatedAt || 'No updates yet.'} className="col-span-3"  readOnly/>
          </div>
          <Separator />
        </div>
            <SheetFooter className="flex items-center justify-center">
                <div className="flex justify-center w-full">
                <SheetClose asChild>
                </SheetClose>
                </div>
            </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}