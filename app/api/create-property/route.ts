import Joi from 'joi';
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Define the schema for the request body
const schema = Joi.object({
    propertyCode: Joi.string().required(),
    propertyName: Joi.string().required(),
    regOwnerName: Joi.string().required(),
    titleNo: Joi.string().required(),
    landBuilding: Joi.string().required(),
    lotNo: Joi.string().required(),
    location: Joi.string().required(),
    cityRegion: Joi.string().required(),
    classification: Joi.string().required(),
    leasableArea: Joi.number().required(),
    orate: Joi.number().required(),
    taxDecNo: Joi.string().required(),
    sysUserId: Joi.string().required()
});

export async function POST(req: Request) {
    try {
        const {propertyCode, propertyName, regOwnerName,
        titleNo, landBuilding, lotNo, location, cityRegion,
        classification, leasableArea, orate, taxDecNo, sysUserId
        } = await req.json()

        // Validate the request body against the schema
        const { error } = schema.validate({
            propertyCode, propertyName, regOwnerName,
            titleNo, landBuilding, lotNo, location, cityRegion,
            classification, leasableArea, orate, taxDecNo, sysUserId
        });

        if (error) {
            return NextResponse.json ({
                status: 'error',
                message: 'Invalid request body. Please provide all required fields.'
            }, { status: 400});
            
        }
      
        const properties = await prisma.properties.create({
            data: {
                propertyCode, propertyName, regOwnerName,
                titleNo, landBuilding, lotNo, location, cityRegion,
                classification, leasableArea, orate, taxDecNo, sysUserId
            }
        })

        return NextResponse.json({
            properties: {
                propertyCode: properties.propertyCode, 
                propertyName: properties.propertyName,
                regOwnerName: properties.regOwnerName,
                titleNo: properties.titleNo,
                landBuilding: properties.landBuilding,
                lotNo: properties.lotNo,
                location: properties.location,
                cityRegion: properties.cityRegion,
                classification: properties.classification,
                leasableArea: properties.leasableArea,
                orate: properties.orate,
                taxDecNo: properties.taxDecNo,
                sysUserId: properties.sysUserId  // Include sysUserId in the response
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