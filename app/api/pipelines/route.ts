import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { userId } = await req.json();

    let pipeline = await prisma.pipeline.findFirst({
      where: { sysUserId: userId },
      include: {
        sysUser: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!pipeline) {
      pipeline = await prisma.pipeline.create({
        data: { name: "New Pipeline", sysUserId: userId },
        include: {
          sysUser: {
            select: {
              name: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      status: 'success',
      pipeline,
    });
  } catch (error) {
    console.error("Error during pipeline fetching or creation:", error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while fetching or creating the pipeline',
    }, { status: 500 });
  }
}