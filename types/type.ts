import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[]
}

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}
