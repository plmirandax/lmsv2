import Joi from 'joi';
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Define the schema for the request body
const schema = Joi.object({
    tenantCode: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    passwordHash: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    zipCode: Joi.string().required(),
    tenantImage: Joi.array().items(Joi.string()).optional(),
    UserId: Joi.string().required()
});

export async function POST(req: Request) {
    try {
        const {tenantCode, name, email, passwordHash,
        contactNo, address, city, province, zipCode, UserId, tenantImage
        } = await req.json()
      
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
                tenantImage,
                UserId
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
                tenantImage: tenants.tenantImage,
                UserId: tenants.UserId, 
                 // Include sysUserId in the response
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