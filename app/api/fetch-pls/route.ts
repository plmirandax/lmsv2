import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Fetch all properties from the database
    const spaces = await prisma.pLS.findMany({
      include: {
        user: {
          select: {
            firstName: true,
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