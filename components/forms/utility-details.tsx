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
    // Add any other properties you expect to receive
}

export function UtilityDetails() {
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
        <Button variant="outline" className="bg-transparent border-none">Tenant Utility Details</Button>
      </SheetTrigger>
      <SheetContent>
     <SheetHeader>
        <SheetTitle>Electricity</SheetTitle>
        <SheetDescription>
          View your electricity details here.
        </SheetDescription>
    </SheetHeader>
  <div className="flex flex-col items-center justify-center gap-4 py-4">
    <Separator />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">
              Meter No.
            </Label>
            <Input id="name" value={name} className="col-span-3" onChange={e => setName(e.target.value)} readOnly/>
            <Label htmlFor="email">
              ID No.
            </Label>
            <Input id="email" value={session?.user?.email || ''} className="col-span-3 text-xs" readOnly />
            <Label htmlFor="role">
              Account No.
            </Label>
            <Input id="role" value={userData?.role || ''} className="col-span-3" readOnly />
            <Label htmlFor="createdAt" className="text-sm">
              Account Name
            </Label>
            <Input id="createdAt" value={userData ? new Date(userData.createdAt).toLocaleString() : ''} className="col-span-3" readOnly />
            <Label htmlFor="updatedAt" className="text-sm">
              Status
            </Label>
            <Input id="updatedAt" value={userData?.updatedAt || 'No updates yet.'} className="col-span-3"  readOnly/>
          </div>
          <Separator />
        </div>
        <SheetHeader>
          <SheetTitle>Water</SheetTitle>
            <SheetDescription>
              View your water utility details here.
            </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center justify-center gap-4 py-4">
    <Separator />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">
              Meter No.
            </Label>
            <Input id="name" value={name} className="col-span-3" onChange={e => setName(e.target.value)} readOnly/>
            <Label htmlFor="email">
              ID No.
            </Label>
            <Input id="email" value={session?.user?.email || ''} className="col-span-3 text-xs" readOnly />
            <Label htmlFor="role">
              Account No.
            </Label>
            <Input id="role" value={userData?.role || ''} className="col-span-3" readOnly />
            <Label htmlFor="createdAt" className="text-sm">
              Account Name
            </Label>
            <Input id="createdAt" value={userData ? new Date(userData.createdAt).toLocaleString() : ''} className="col-span-3" readOnly />
            <Label htmlFor="updatedAt" className="text-sm">
              Status
            </Label>
            <Input id="updatedAt" value={userData?.updatedAt || 'No updates yet.'} className="col-span-3"  readOnly/>
          </div>
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