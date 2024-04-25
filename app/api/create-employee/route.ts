import { z } from 'zod';
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from 'bcrypt';

// Define the schema for the request body
const schema = z.object({
    empId: z.string(),
    name: z.string(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    email: z.string(),
    password: z.string(),
    role: z.string(),
    image: z.string().optional(),
    deptId: z.string(),
    approverId: z.string(),
    createdBy: z.string(),
});

export async function POST(req: Request) {
    try {
        const { empId, name, contactNo, address, email, password, role, image, approverId, deptId, createdBy} = await req.json()

        // Validate the request body against the schema
        schema.parse({ empId, name, contactNo, address, email, password, role, image, approverId, deptId, createdBy});

        const existingUser = await prisma.user.findUnique({ where: { email, empId } });
        if (existingUser) {
          return NextResponse.json({
            status: 'error',
            message: 'User already exists. Please try again.',
          }, { status: 400 });
        }

        const hashed = await hash(password, 12);

        const employees = await prisma.user.create({
            data: {
                empId, name, contactNo, address, email, password: hashed, role, image, approverId, deptId, createdBy
            }
        })
        
        if (employees.approverId) {
            await prisma.approval.create({
                data: {
                    approverId: employees.approverId,
                    // Add any other necessary fields here
                }
            })
        }

        return NextResponse.json({
            employees: {
                empId: employees.empId,
                name: employees.name,
                contactNo: employees.contactNo,
                address: employees.address,
                email: employees.email,
                password: employees.password,
                role: employees.role,
                image: employees.image,
                approverId: employees.approverId,
                deptId: employees.deptId,
                createdBy: employees.createdBy
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