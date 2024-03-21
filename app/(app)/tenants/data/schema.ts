import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tenantsSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  contactNo: z.string(),
  address: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  tenantImage: z.string().nullable(),
  deletedAt: z.date().nullable(),
  User: z.object({
    name: z.string(),
  }).nullable(),
});

export type Tenants = z.infer<typeof tenantsSchema>;