"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string; icon: JSX.Element }[] = [
  {
    title: "Dashboard 📊",
    href: "/dashboard",
    description:
      "It shows you an overview of your properties and your tasks.",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    title: "Properties 🏢",
    href: "/properties",
    description:
      "Properties are the assets that you manage. They can be residential, commercial, or industrial properties.",
      icon: <AiOutlineUsergroupAdd />,
  },
  {
    title: "Tenants 👨‍👩‍👧‍👧" ,
    href: "/tenants",
    description:
      "Tenants are the people or businesses that rent or lease your properties. They can be residential, commercial, or industrial tenants.",
      icon: <AiOutlineUsergroupAdd />,
  },
  {
    title: "Billing 💵" ,
    href: "/billing",
    description:
      "Billing is the process of generating invoices for your tenants and collecting payments from them.",
      icon: <AiOutlineUsergroupAdd />,
  },
  {
    title: "Task Manager 📋",
    href: "/taskmanager",
    description: "A task manager is a system that manages the tasks assigned to you and your team.",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    title: "Administrator Settings ⚙️",
    href: "/register",
    description:
      "Administrator settings are the settings that you can change to manage your account and your system users.",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    title: "Reports 📈",
    href: "/reports",
    description:
      "Reports are the documents that you can generate to see the performance of your properties and your tenants.",
      icon: <AiOutlineUsergroupAdd />,
  },
]

export function SystemMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>System Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
