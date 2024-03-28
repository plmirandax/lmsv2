import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all properties from the database
    const spaces = await prisma.spaces.findMany({
      include: {
        sysUser: {
          select: {
            name: true,
          },
        },
      },
    });

    // Return the fetched properties
    return NextResponse.json({
      status: 'success',
      spaces,
    });
  } catch (error) {
    console.error("Error during properties fetching:", error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while fetching properties',
    }, { status: 500 });
  }
}