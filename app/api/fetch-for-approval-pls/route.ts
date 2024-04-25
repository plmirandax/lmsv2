import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all properties from the database
    const plss = await prisma.pLS.findMany({
      select: {
        plsDate: true,
        plsType: true,
        destination: true,
        description: true,
        timeIn: true,
        timeOut: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        approver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Return the fetched properties
    return NextResponse.json({
      status: 'success',
      plss,
    });
  } catch (error) {
    console.error("Error during properties fetching:", error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while fetching properties',
    }, { status: 500 });
  }
}