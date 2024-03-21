import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const propertiesSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  propertyCode: z.string(),
  propertyName: z.string().nullable(),
  regOwnerName: z.string().nullable(),
  titleNo: z.string().nullable(),
  landBuilding: z.string().nullable(),
  lotNo: z.string().nullable(),
  location: z.string().nullable(),
  cityRegion: z.string().nullable(),
  classification: z.string().nullable(),
  leasableArea: z.string().nullable(),
  orate: z.string().nullable(),
  taxDecNo: z.string().nullable(),
  propertyImage: z.string().nullable(),
  sysUserId: z.string(),
  createdBy: z.string().nullable(),
  updatedBy: z.string().nullable(),
  deletedAt: z.date().nullable(),
  sysUser: z.object({
    name: z.string(),
  }).nullable(),
});

export type Properties = z.infer<typeof propertiesSchema>;