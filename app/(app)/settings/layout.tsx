import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/app/(app)/settings/components/sidebar-nav"
import TeamSwitcher from "../dashboard/components/team-switcher"
import { Search } from "../dashboard/components/search"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "../dashboard/components/user-nav"
import { SystemMenu } from "../dashboard/components/system-menu"

export const metadata: Metadata = {
  title: "Settings",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
    <div className="border-b">
    <div className="w-full h-auto md:h-16">
            <div className="flex h-16 items-center px-4">
            <div className="hidden sm:block">
                  <TeamSwitcher />
            </div>
            <SystemMenu />
              <div className="ml-auto flex items-center space-x-2">
                <Search />
                <ModeToggle />
                <UserNav />
              </div>
          </div>
          </div>
        </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
