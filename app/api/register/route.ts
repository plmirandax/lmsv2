import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name, contactNo, address, empId } = await req.json();

    if (!email || !password || !name || !contactNo || !address || !empId) {
      return NextResponse.json({
        status: 'error',
        message: 'Please provide all required fields: email, password, name',
      }, { status: 400 }); 
    }

  
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({
        status: 'error',
        message: 'A user with this email already exists',
      }, { status: 400 });
    }

    const hashed = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        empId,
        name,
        contactNo,
        address,
        password: hashed,
      },
    });

    return NextResponse.json({
      status: 'success',
      user: {
        email: user.email,
        name: user.name,
        contactNo: user.contactNo,
        address: user.address,
        empId: user.empId,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while processing your request',
    }, { status: 500 });
  }
}
