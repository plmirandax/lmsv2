import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({
        status: 'error',
        message: 'Please provide the email',
      }, { status: 400 }); 
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({
        status: 'error',
        message: 'User not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      status: 'success',
      user: {
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during user fetching:", error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while processing your request',
    }, { status: 500 });
  }
}