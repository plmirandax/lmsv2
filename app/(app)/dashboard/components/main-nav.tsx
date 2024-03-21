import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/properties"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Properties
      </Link>
      <Link
        href="/tenants"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tenants
      </Link>
      <Link
        href="/billing"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Billing
      </Link>

      <Link
        href="/taskmanager"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Task Manager
      </Link>

    </nav>
  )
}