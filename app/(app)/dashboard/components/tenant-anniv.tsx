import { GetServerSideProps } from 'next'
import { PrismaClient } from '@prisma/client'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const prisma = new PrismaClient()

interface Tenant {
  name: string
  email: string
  createdAt: Date
  tenantImage: string | null
}

export const getServerSideProps: GetServerSideProps = async () => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const tenants: Tenant[] = await prisma.tenant.findMany({
    take: 5,
    where: {
      createdAt: {
        gte: new Date(currentYear, currentMonth, 1),
        lt: new Date(currentYear, currentMonth + 1, 1)
      }
    },
    select: {
      name: true,
      email: true,
      createdAt: true,
      tenantImage: true
    }
  })

  return { props: { tenants } }
}

export function TenantAnniv({ tenants }: { tenants: Tenant[] }) {
  return (
    <div className="space-y-8">
      {tenants.map((tenant) => (
        <div className="flex items-center" key={tenant.email}>
          <Avatar className="h-9 w-9">
            {tenant.tenantImage ? (
              <AvatarImage src={tenant.tenantImage} alt="Avatar" />
            ) : (
              <AvatarFallback>{tenant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{tenant.name}</p>
            <p className="text-sm text-muted-foreground">{tenant.email}</p>
          </div>
          <div className="ml-auto font-medium"></div>
        </div>
      ))}
    </div>
  )
}