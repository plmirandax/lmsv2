import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all tenants from the database
    const tenants = await prisma.tenant.findMany({
      include: {
        sysUser: {
          select: {
            name: true,
          },
        },
      },
    });

    // Return the fetched tenants
    return NextResponse.json({
      status: 'success',
      tenants,
    });
  } catch (error) {
    console.error("Error during tenants fetching:", error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while fetching tenants',
    }, { status: 500 });
  }
}