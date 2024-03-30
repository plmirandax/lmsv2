import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "../dashboard/components/user-nav"
import { taskSchema } from "./data/schema"
import TeamSwitcher from "../dashboard/components/team-switcher"
import { MainNav } from "../dashboard/components/main-nav"
import { Search } from "../dashboard/components/search"
import { ModeToggle } from "@/components/mode-toggle"
import { AdminControl } from "../dashboard/components/admin-settings"
import { SystemMenu } from "../dashboard/components/system-menu"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A task and issue tracker built using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(app)/taskmanager/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <div className="min-h-screen flex flex-col">
          <div className="w-full h-auto md:h-16">
            <div className="flex h-16 items-center px-4">
            <div className="hidden sm:block pr-4">
                  <TeamSwitcher />
            </div>
            <SystemMenu />
              <div className="ml-auto flex items-center space-x-2">
                <Search />
                <ModeToggle />
                <UserNav />
              </div>
          </div>
          <Separator />
          </div>
       <div className="flex-1 flex flex-col p-4">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here are the list of your tasks for this month.
          </p>
        </div>
        <div className="flex-1 overflow-auto">
          <DataTable data={tasks} columns={columns} />
        </div>
      </div>
    </div>
  )
}
