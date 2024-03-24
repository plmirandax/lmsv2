'use server'
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/app/(app)/actions/email/sendEmail";
import crypto from "crypto";
import { VerifyEmailEmailTemplate } from '../../../providers/email-templates/verify-email-email'

export async function POST(req: Request) {
  try {
    const { tenantCode, province, city, zipCode, email, password, name, contactNo, address, tenantImage } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({
        status: 'error',
        message: 'Please provide all required fields: email, password, name, contact no, address and tenant image',
      }, { status: 400 }); 
    }

  
    const existingTenant = await prisma.tenant.findUnique({ where: { email } });
    if (existingTenant) {
      return NextResponse.json({
        status: 'error',
        message: 'A tenant with this email already exists',
      }, { status: 400 });
    }

    const hashed = await hash(password, 12);

    const tenant = await prisma.tenant.create({
      data: {
        tenantCode,
        province,
        city,
        zipCode,
        email,
        name,
        passwordHash: hashed,
        contactNo,
        address,
        tenantImage,
      },
    });

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

    await prisma.tenant.update({
        where: {
            id: tenant.id
        },
        data: {
          emailVerificationToken: emailVerificationToken,
        }
    })

    await sendEmail({
        from: 'RD Realty Development Corporation <no-reply@rdhardware.net>',
        to: [email],
        subject: 'Verify your email address',
        react: VerifyEmailEmailTemplate({email, emailVerificationToken}) as React.ReactElement
    });

    return NextResponse.json({
      status: 'success',
      user: {
        email: tenant.email,
        name: tenant.name,
        contactNo: tenant.contactNo,
        address: tenant.address,
        tenantImage: tenant.tenantImage,
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
