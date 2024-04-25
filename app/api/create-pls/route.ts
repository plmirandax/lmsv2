import { z } from 'zod';
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Define the schema for the request body
const schema = z.object({
    plsType: z.string(),
    destination: z.string(),
    description: z.string(),
    timeIn: z.string().optional(),
    timeOut: z.string().optional(),
    userId: z.string(),
    approverId: z.string(),
});

export async function POST(req: Request) {
    try {
        const { plsType, plsDate, destination, description, timeIn, timeOut, userId, approverId} = await req.json()

        // Validate the request body against the schema
        schema.parse({ plsType, plsDate, destination, description, timeIn, timeOut, userId, approverId });

        const pls = await prisma.pLS.create({
            data: {
                plsType, plsDate, destination, description, timeIn, timeOut, userId, approverId
            }
        })

        return NextResponse.json({
            pls: {
                plsType: pls.plsType,
                plsDate: pls.plsDate,
                destination: pls.destination,
                description: pls.description,
                timeIn: pls.timeIn,
                timeOut: pls.timeOut,
                userId: pls.userId,
                approverId: pls.approverId
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