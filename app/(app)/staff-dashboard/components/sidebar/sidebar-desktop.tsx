'use client';

import { SidebarButton } from './sidebar-button';
import { SidebarItems } from '@/types/type';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { CardDescription } from '@/components/ui/card';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <aside className='w-[290px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r'>
      <div className='h-full px-3 py-4'>
            <div className='flex items-center mb-4'>
              <Image src='/assets/rdrdc.webp' alt='rdrdc-logo' width={30} height={30} className='flex flex-row mr-1'/>
              <Image src='/assets/rdh.webp' alt="rdrdc-logo" width={40} height={40}/>
              <h3 className='mx-3 text-md font-semibold text-foreground ml-2'>RDRDC & RDH - HRIS</h3>
            </div>
        <div className='mb-6 mt-6'>
          <div className='flex flex-col gap-4 w-full'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
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
          <div className='absolute left-0 bottom-3 w-full px-3'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <CardDescription className='items-center text-center'>RD Realty Development Corporation</CardDescription>
            <div><CardDescription className='items-center text-center'>RD Hardware & Fishing Supply, Inc.</CardDescription></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
