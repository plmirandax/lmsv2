import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Assuming you expect an empty request body for fetching properties
    const { } = await req.json();

    // Fetch all properties from the database
    const tenants = await prisma.tenant.findMany({
      include: {
        sysUser: {
          select: {
            name: true,
          },
        },
        space: {
          select: {
            spaceName: true,
          },
        }
      },
    });

    // Return the fetched properties
    return NextResponse.json({
      status: 'success',
      tenants,
    });
  } catch (error) {
    console.error("Error during properties fetching:", error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while fetching tenants',
    }, { status: 500 });
  }
}
