import React from 'react'
import TeamSwitcher from '../dashboard/components/team-switcher'
import { SystemMenu } from '../dashboard/components/system-menu'
import { Search } from '../dashboard/components/search'
import { ModeToggle } from '@/components/mode-toggle'
import { UserNav } from '../dashboard/components/user-nav'

const ReportsPage = () => {
  return (
    <>
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
    <div className='flex items-center justify-center h-screen text-center'>
      <label>Reports Page</label>
    </div>
    </>
  )
}

export default ReportsPage