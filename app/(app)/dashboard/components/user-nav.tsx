// Rename the file to user-nav.client.tsx
'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Image from "next/image"
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "../../../../components/forms/user-profile";

export function UserNav() {

  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (loading) {
    return null
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
  {session?.user?.image ? (
    <AvatarImage src={session.user.image} alt="@shadcn" />
  ) : (
    <AvatarImage src="/assets/usericon.png" alt="@shadcn" />
  )}
  <AvatarFallback>
    <Image src="/assets/usericon.png" alt="Fallback Image" width={40} height={40}/>
  </AvatarFallback>
</Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full lg:w-60 overflow-auto" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-4">
            <p className="flex flex-col text-lg font-medium leading-none text-center">{session?.user?.name}</p>
            <p className="flex flex-col text-ml space-y-4 leading-none text-muted-foreground">
            {session?.user?.email}
            </p>
            <p className="text-sm space-y-4 leading-none text-muted-foreground">
            <Badge className="flex flex-col"variant="destructive"> {session?.user?.role}</Badge>
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-col text-center bg-transparent border-none">
          <div onClick={(e) => e.stopPropagation()}>
                <UserProfile />
          </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({callbackUrl: '/'})} className="flex flex-col text-center">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
