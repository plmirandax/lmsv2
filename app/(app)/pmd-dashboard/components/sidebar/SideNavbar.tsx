'use client';

import {
  CalendarCheck2,
  FileClockIcon,
  HomeIcon,
  LineChart,
  Scroll,
  Settings,
  User,
  Users,
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types/type'
import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Dashboard', href: '/pmd-dashboard', icon: HomeIcon },
    { label: 'Leave Management', href: '/pmd-dashboard/leave-management', icon: CalendarCheck2 },
    { label: 'PLS Management', href: '/pmd-dashboard/pls-management', icon: FileClockIcon },
    {
      href: '/pmd-dashboard/payslip-management',
      icon: Scroll,
      label: 'Payslip Management',
    },
    {
      href: '/pmd-dashboard/employee-management',
      icon: Users,
      label: 'Employee Management',
    },
    {
      href: '/pmd-dashboard/reports',
      icon: LineChart,
      label: 'Reports',
    },
    {
      href: '/pmd-dashboard/profile',
      icon: User,
      label: 'Profile',
    },
    {
      href: '/pmd-dashboard/settings',
      icon: Settings,
      label: 'System Settings',
    },
  ],
};

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 650px)', {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
