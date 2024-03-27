import Joi from 'joi';
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Define the schema for the request body
const schema = Joi.object({
    spaceCode: Joi.string().required(),
    spaceName: Joi.string().required(),
    oStatus: Joi.string().required(),
    leasePeriod: Joi.string().required(),
    expiryDate: Joi.date().required(),
    gFloorArea: Joi.number().required(),
    mezFloor: Joi.number().required(),
    secFloor: Joi.number().required(),
    thirdFloor: Joi.number().required(),
    roofTop: Joi.number().required(),
    totalArea: Joi.number().required(),
    monthlyRent: Joi.number().required(),
    spacesImage: Joi.string().required(),
    tenantId: Joi.string().required(),
    sysUserId: Joi.string().required()
});

export async function POST(req: Request) {
    try {
        const {spaceCode, spaceName, oStatus, leasePeriod, expiryDate,
        gFloorArea, mezFloor, secFloor, thirdFloor, roofTop, totalArea,
        monthlyRent, spacesImage, tenantId, sysUserId
        } = await req.json()

        // Validate the request body against the schema
        const { error } = schema.validate({
            spaceCode, spaceName, oStatus, leasePeriod, expiryDate,
            gFloorArea, mezFloor, secFloor, thirdFloor, roofTop, totalArea,
            monthlyRent, spacesImage, tenantId, sysUserId
        });

        if (error) {
            console.error('Error:', error);
            return NextResponse.json({
                status: 'error',
                message: 'Invalid request body. Please provide all required fields.'
            }, { status: 400 });
        }
      
        const spaces = await prisma.spaces.create({
            data: {
                spaceCode,
                spaceName,
                oStatus,
                leasePeriod,
                expiryDate,
                gFloorArea,
                mezFloor,
                secFloor,
                thirdFloor,
                roofTop,
                totalArea,
                monthlyRent,
                spacesImage,
                tenantId,
                sysUserId
            }
        })

        return NextResponse.json({
            properties: {
                spaceCode: spaces.spaceCode,
                spaceName: spaces.spaceName,
                oStatus: spaces.oStatus,
                leasePeriod: spaces.leasePeriod,
                expiryDate: spaces.expiryDate,
                gFloorArea: spaces.gFloorArea,
                mezFloor: spaces.mezFloor,
                secFloor: spaces.secFloor,
                thirdFloor: spaces.thirdFloor,
                roofTop: spaces.roofTop,
                totalArea: spaces.totalArea,
                monthlyRent: spaces.monthlyRent,
                spacesImage: spaces.spacesImage,
                tenantId: spaces.tenantId,
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