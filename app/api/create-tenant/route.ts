import { z } from 'zod';
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Define the schema for the request body
const schema = z.object({
    tenantCode: z.string(),
    name: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    contactNo: z.string(),
    address: z.string(),
    city: z.string(),
    province: z.string(),
    zipCode: z.string(),
    leasePeriod: z.string().transform((value) => new Date(value)),
    expiryDate: z.string().transform((value) => new Date(value)),
    tenantImage: z.string().optional(),
    spaceId: z.string(),
    sysUserId: z.string()
});

export async function POST(req: Request) {
    try {
        const {
            tenantCode, name, email, passwordHash,
            contactNo, address, city, province, zipCode, leasePeriod, expiryDate, sysUserId, spaceId, tenantImage
        } = schema.parse(await req.json())
      
        const tenants = await prisma.tenant.create({
            data: {
                name,
                tenantCode,
                email,
                passwordHash,
                contactNo,
                address,
                city,
                province,
                zipCode,
                leasePeriod,
                expiryDate,
                tenantImage,
                spaceId,
                sysUserId
            }
        })

        return NextResponse.json({
            tenants: {
                name: tenants.name,
                email: tenants.email,
                password: tenants.passwordHash,
                contactNo: tenants.contactNo,
                address: tenants.address,
                city: tenants.city,
                province: tenants.province,
                zipCode: tenants.zipCode,
                leasePeriod: tenants.leasePeriod,
                expiryDate: tenants.expiryDate,
                tenantImage: tenants.tenantImage,
                spaceId: tenants.spaceId,
                sysUserId: tenants.sysUserId, 
            }
        })
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json({
            status: 'error',
            message: 'An error occurred while processing your request',
        }, { status: 500 });
    }
}