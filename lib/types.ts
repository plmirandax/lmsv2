import {
  Lane,
  Prisma,
  Tag,
  Tenant,
  Ticket,
  User,
} from '@prisma/client'
import {
  _getTicketsWithAllRelations,
  getPipelineDetails,
  getTicketsWithTags,
} from './queries'
import { prisma } from './prisma'
import { z } from 'zod'


export type TicketAndTags = Ticket & {
  Tags: Tag[];
  AssignedsysUser: User | null;
  Tenant: Tenant | null;
}

export type LaneDetail = Lane & {
  Tickets: TicketAndTags[]
}

export const CreatePipelineFormSchema = z.object({
  name: z.string().min(1),
})


export type PipelineDetailsWithLanesCardsTagsTickets = Prisma.PromiseReturnType<
  typeof getPipelineDetails
>

export const LaneFormSchema = z.object({
  name: z.string().min(1),
})

export type TicketWithTags = Prisma.PromiseReturnType<typeof getTicketsWithTags>

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/

export const TicketFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  value: z.string().refine((value) => currencyNumberRegex.test(value), {
    message: 'Value must be a valid price.',
  }),
})

export type TicketDetails = Prisma.PromiseReturnType<
  typeof _getTicketsWithAllRelations
>

export const getSubAccountTeamMembers = async (id: string) => {
  const subaccountUsersWithAccess = await prisma.user.findMany({
    where: {
      role: 'Administrator' || 'sysUser',
    },
  })
  return subaccountUsersWithAccess
}
