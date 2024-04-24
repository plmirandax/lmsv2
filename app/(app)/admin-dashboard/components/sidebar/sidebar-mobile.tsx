'use client';

import { SidebarItems } from '@/types/type';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { SidebarButtonSheet as SidebarButton } from './sidebar-button';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { CardDescription } from '@/components/ui/card';
import Image from 'next/image';

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost' className='fixed top-3 left-3'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='px-3 py-4'>
        <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
        <div className='flex items-center mb-4'>
              <Image src='/assets/rdrdc.webp' alt='rdrdc-logo' width={30} height={30} className='flex flex-row'/>
              <h3 className='mx-3 text-lg font-semibold text-foreground ml-4'>RDRDC & RDH - HRIS</h3>
            </div>
          <SheetClose asChild>
          </SheetClose>
        </SheetHeader>
        <div className='h-full'>
          <div className='mt-5 flex flex-col w-full gap-1'>
            {props.sidebarItems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'secondary' : 'ghost'}
                  icon={link.icon}
                  className='w-full'
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className='absolute w-full bottom-4 px-1 left-0'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <CardDescription className='items-center text-center'>RD Realty Development Corporation</CardDescription>
            <div><CardDescription className='items-center text-center'>RD Hardware & Fishing Supply, Inc.</CardDescription></div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
