import Joi from 'joi';
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Define the schema for the request body
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
    UserId: Joi.string().required()
});

export async function POST(req: Request) {
    try {
        const {name, email, password,
        contactNo, address, UserId
        } = await req.json()

        // Validate the request body against the schema
        const { error } = schema.validate({
            name, email, password, contactNo, address, UserId
        });

        if (error) {
            return NextResponse.json ({
                status: 'error',
                message: 'Invalid request body. Please provide all required fields.'
            }, { status: 400});
            
        }
      
        const tenants = await prisma.tenant.create({
            data: {
                name,
                email,
                password,
                contactNo,
                address,
                UserId
            }
        })

        return NextResponse.json({
            tenants: {
                name: tenants.name,
                email: tenants.email,
                password: tenants.password,
                contactNo: tenants.contactNo,
                address: tenants.address,
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