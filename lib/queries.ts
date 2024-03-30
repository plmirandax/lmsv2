'use server'

import { prisma } from './prisma'
import {
  Lane,
  Prisma,
  Role,
  Tenant,
  Tag,
  Ticket,
  User,
} from '@prisma/client'
import { v4 } from 'uuid'

export const getPipelineDetails = async (pipelineId: string) => {
  const response = await prisma.pipeline.findUnique({
    where: {
      id: pipelineId,
    },
  })
  return response
}

export const getLanesWithTicketAndTags = async (pipelineId: string) => {
  const response = await prisma.lane.findMany({
    where: {
      pipelineId,
    },
    orderBy: { order: 'asc' },
    include: {
      Tickets: {
        orderBy: {
          order: 'asc',
        },
        include: {
          Tags: true,
          AssignedsysUser: true,
          Tenant: true,
        },
      },
    },
  })
  return response
}

export const upsertPipeline = async (
  pipeline: Prisma.PipelineUncheckedCreateWithoutLaneInput
) => {
  const response = await prisma.pipeline.upsert({
    where: { id: pipeline.id || v4() },
    update: pipeline,
    create: pipeline,
  })

  return response
}

export const deletePipeline = async (pipelineId: string) => {
  const response = await prisma.pipeline.delete({
    where: { id: pipelineId },
  })
  return response
}

export const updateLanesOrder = async (lanes: Lane[]) => {
  try {
    const updateTrans = lanes.map((lane) =>
      prisma.lane.update({
        where: {
          id: lane.id,
        },
        data: {
          order: lane.order,
        },
      })
    )

    await prisma.$transaction(updateTrans)
    console.log('🟢 Done reordered 🟢')
  } catch (error) {
    console.log(error, 'ERROR UPDATE LANES ORDER')
  }
}

export const updateTicketsOrder = async (tickets: Ticket[]) => {
  try {
    const updateTrans = tickets.map((ticket) =>
      prisma.ticket.update({
        where: {
          id: ticket.id,
        },
        data: {
          order: ticket.order,
          laneId: ticket.laneId,
        },
      })
    )

    await prisma.$transaction(updateTrans)
    console.log('🟢 Done reordered 🟢')
  } catch (error) {
    console.log(error, '🔴 ERROR UPDATE TICKET ORDER')
  }
}

export const upsertLane = async (lane: Prisma.LaneUncheckedCreateInput) => {
  let order: number

  if (!lane.order) {
    const lanes = await prisma.lane.findMany({
      where: {
        pipelineId: lane.pipelineId,
      },
    })

    order = lanes.length
  } else {
    order = lane.order
  }

  const response = await prisma.lane.upsert({
    where: { id: lane.id || v4() },
    update: lane,
    create: { ...lane, order },
  })

  return response
}

export const deleteLane = async (laneId: string) => {
  const resposne = await prisma.lane.delete({ where: { id: laneId } })
  return resposne
}

export const getTicketsWithTags = async (pipelineId: string) => {
  const response = await prisma.ticket.findMany({
    where: {
      Lane: {
        pipelineId,
      },
    },
    include: { Tags: true, AssignedsysUser: true, Tenant: true },
  })
  return response
}

export const _getTicketsWithAllRelations = async (laneId: string) => {
  const response = await prisma.ticket.findMany({
    where: { laneId: laneId },
    include: {
      AssignedsysUser: true,
      Tenant: true,
      Lane: true,
      Tags: true,
    },
  })
  return response
}

export const searchContacts = async (searchTerms: string) => {
  const response = await prisma.tenant.findMany({
    where: {
      name: {
        contains: searchTerms,
      },
    },
  })
  return response
}

export const upsertTicket = async (
  ticket: Prisma.TicketUncheckedCreateInput,
  tags: Tag[]
) => {
  let order: number
  if (!ticket.order) {
    const tickets = await prisma.ticket.findMany({
      where: { laneId: ticket.laneId },
    })
    order = tickets.length
  } else {
    order = ticket.order
  }

  const response = await prisma.ticket.upsert({
    where: {
      id: ticket.id || v4(),
    },
    update: { ...ticket, Tags: { set: tags } },
    create: { ...ticket, Tags: { connect: tags }, order },
    include: {
      AssignedsysUser: true,
      Tenant: true,
      Tags: true,
      Lane: true,
    },
  })

  return response
}

export const deleteTicket = async (ticketId: string) => {
  const response = await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  })

  return response
}

export const upsertTag = async (
  sysUserId: string,
  tag: Prisma.TagUncheckedCreateInput
) => {
  const response = await prisma.tag.upsert({
    where: { id: tag.id || v4(), sysUserId: sysUserId},
    update: tag,
    create: { ...tag, sysUserId: sysUserId },
  })

  return response
}

export const getTagsForSubaccount = async (sysUserId: string) => {
  const response = await prisma.user.findUnique({
    where: { id: sysUserId },
    select: { Tags: true },
  })
  return response
}

export const deleteTag = async (tagId: string) => {
  const response = await prisma.tag.delete({ where: { id: tagId } })
  return response
}


export const getPipelines = async (sysUserId: string) => {
  const response = await prisma.pipeline.findMany({
    where: { sysUserId: sysUserId },
    include: {
      Lane: {
        include: { Tickets: true },
      },
    },
  })
  return response
}
