'use client'
import { Suspense, useEffect, useState } from 'react';
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "../dashboard/components/user-nav";
import TeamSwitcher from "../dashboard/components/team-switcher";
import { Search } from "../dashboard/components/search";
import { ModeToggle } from "@/components/mode-toggle";
import { SystemMenu } from "../dashboard/components/system-menu";
import { Skeleton } from '@/components/ui/skeleton';


export default function TenantsPage() {
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
    <div className="min-h-screen flex flex-col">
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
      <div className="flex-1 flex flex-col p-4">
        <div className="flex flex-col space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Tenant Management</h2>
          <p className="text-muted-foreground">
            This is where you can manage your tenants.
          </p>
          <p></p>
        </div>
        <div className="flex-1 overflow-auto">
          <Suspense fallback={<Skeleton />}>
          <DataTable data={tenants} columns={columns} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
