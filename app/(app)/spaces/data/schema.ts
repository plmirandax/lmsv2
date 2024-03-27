import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tenantsSchema = z.object({
  spaceCode: z.string(),
  spaceName: z.string(),
  oStatus: z.string(),
  leasePeriod: z.string(),
  expiryDate: z.date(),
  gFloorArea: z.number(),
  mezFloor: z.number(),
  secFloor: z.number(),
  thirdFloor: z.number(),
  roofTop: z.number(),
  totalArea: z.number(),
  monthlyRent: z.number(),
  spacesImage: z.string(),
  tenantId: z.string(),
  propertyId: z.string(),
  sysUserId: z.string(),
});

export type Spaces = z.infer<typeof tenantsSchema>;