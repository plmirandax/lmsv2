import { z } from 'zod';
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Define the schema for the request body
const schema = z.object({
    spaceCode: z.string(),
    spaceName: z.string(),
    oStatus: z.string(),
    gFloorArea: z.number(),
    mezFloor: z.number(),
    secFloor: z.number(),
    thirdFloor: z.number(),
    roofTop: z.number(),
    totalArea: z.number(),
    monthlyRent: z.number(),
    spacesImage: z.string(),
    propertyId: z.string(),
    sysUserId: z.string()
});

export async function POST(req: Request) {
    try {
        const {
            spaceCode, spaceName, oStatus,
            gFloorArea, mezFloor, secFloor, thirdFloor, roofTop, totalArea,
            monthlyRent, spacesImage, propertyId, sysUserId
        } = await req.json()

        // Validate the request body against the schema
        schema.parse({
            spaceCode, spaceName, oStatus,
            gFloorArea, mezFloor, secFloor, thirdFloor, roofTop, totalArea,
            monthlyRent, spacesImage, propertyId, sysUserId
        });

        const spaces = await prisma.spaces.create({
            data: {
                spaceCode,
                spaceName,
                oStatus,
                gFloorArea,
                mezFloor,
                secFloor,
                thirdFloor,
                roofTop,
                totalArea,
                monthlyRent,
                spacesImage,
                propertyId,
                sysUserId
            }
        })

        return NextResponse.json({
            properties: {
                spaceCode: spaces.spaceCode,
                spaceName: spaces.spaceName,
                oStatus: spaces.oStatus,
                gFloorArea: spaces.gFloorArea,
                mezFloor: spaces.mezFloor,
                secFloor: spaces.secFloor,
                thirdFloor: spaces.thirdFloor,
                roofTop: spaces.roofTop,
                totalArea: spaces.totalArea,
                monthlyRent: spaces.monthlyRent,
                spacesImage: spaces.spacesImage,
                propertyId: spaces.propertyId,
                sysUserId: spaces.sysUserId
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