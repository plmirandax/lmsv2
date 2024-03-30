'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/app/(app)/dashboard/components/date-range-picker"
import { Overview } from "@/app/(app)/dashboard/components/overview"
import { ActiveTenants } from "@/app/(app)/dashboard/components/recent-sales"
import { Search } from "@/app/(app)/dashboard/components/search"
import TeamSwitcher from "@/app/(app)/dashboard/components/team-switcher"
import { UserNav } from "@/app/(app)/dashboard/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { TenantAnniv } from "./components/tenant-anniv"
import { SystemMenu } from "./components/system-menu"
import { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {

  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchtenants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Send any necessary data in the request body
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch property data');
        }
  
        const responseData = await response.json();
        setTenants(responseData.tenants); // Set only the properties field to state
  
        // Log the properties data to the console
        console.log(responseData.tenants);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    }
  
    fetchData();
  }, []);// This useEffect will run only once after the initial render

  return (
    <>
      <div className="w-full md:h-16">
         <div className="w-full h-auto md:h-16">
            <div className="flex h-16 items-center px-4">
            <div className="hidden sm:block pr-2">
                  <TeamSwitcher />
            </div>
            <div className="flex pl-2"> <SystemMenu /></div>

              <div className="ml-auto flex items-center space-x-2">
                <Search />
                <ModeToggle />
                <UserNav />
              </div>
          </div>
          <Separator />
          </div>
        <div className="flex-1 space-y-4 p-8 md:p-4 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:items-center">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker />
              <Button>Download</Button> */}
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="logs">
                Audit Logs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Annual Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Rent Sales
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tenant Termination</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+34</div>
                    <p className="text-xs text-muted-foreground">
                      +9% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Tenants
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tenants.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last year.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Tenant Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>New Tenants. 🥳✨</CardTitle>
                    <CardDescription>
                      You have {tenants.length} new tenants for this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex">
                  <div className="w-1/2">
                      <ActiveTenants tenants={tenants.slice(0,5)}/>
                  </div>
                  <div className="w-1/2">
                      <ActiveTenants tenants={tenants.slice(5,10)}/>
                  </div>
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Tenant Anniversaries 🎉🎉</CardTitle>
                    <CardDescription>
                      You have {tenants.length} tenants that is celebrating their anniversary this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex">
                    <div className="w-1/2">
                    <TenantAnniv tenants={tenants.slice(0,5)}/>
                    </div>
                    <div className="w-1/2">
                    <TenantAnniv tenants={tenants.slice(5,10)}/>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* //This is the Reports tab */}
            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Annual Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Rent Sales
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tenant Termination</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+34</div>
                    <p className="text-xs text-muted-foreground">
                      +9% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Tenants
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tenants.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last year.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Tenant Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>New Tenants.</CardTitle>
                    <CardDescription>
                      You have {tenants.length} new tenants for this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActiveTenants tenants={tenants}/>
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Tenant Anniversaries 🎉🎉</CardTitle>
                    <CardDescription>
                      You have {tenants.length} tenants that is celebrating their anniversary this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TenantAnniv tenants={tenants}/>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}