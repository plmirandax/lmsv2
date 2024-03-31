import xlsx, { IJsonSheet } from "json-as-xlsx";
import { PrismaClient } from "@prisma/client";

interface ITenant {
  [key: string]: any;
  tenantCode: string | null;
  name: string;
  space: {
    spaceName: string;
    property: {
      propertyName: string;
    };
  } | null; // Allow space to be null
  email: string;
  emailVerified: boolean;
  contactNo: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  leasePeriod: Date;
  expiryDate: Date;
  monthlyRent: number;
  sysUser: {
    name: string;
  };
}

export async function downloadToExcel(prisma: PrismaClient) {
  // Fetch tenants from the database
  const tenants: ITenant[] = (await prisma.tenant.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      passwordHash: true,
      contactNo: true,
      tenantCode: true,
      address: true,
      city: true,
      province: true,
      zipCode: true,
      leasePeriod: true,
      expiryDate: true,
      monthlyRent: true,
      sysUser: {
        select: {
          id: true,
          name: true,
        }
      },
      space: {
        select: {
          id: true,
          spaceName: true,
          property: {
            select: {
              propertyName: true,
            }
          }
        }
      },
    }
  })).filter(tenant => tenant.space !== null) as ITenant[]; // Filter out tenants with null space

  let columns: IJsonSheet[] = [
    {
      sheet: "Tenants",
      columns: [
        { label: "Tenant Code", value: "tenantCode" },
        { label: "Name", value: "name" },
        { label: "Space", value: "space.spaceName" },
        { label: "Email", value: "email"},
        { label: "Verified?", value: "emailVerified" },
        { label: "Contact No.", value: "contactNo" },
        { label: "Address", value: "address" },
        { label: "City", value: "city" },
        { label: "Province", value: "province" },
        { label: "Zip Code", value: "zipCode" },
        { label: "Lease Period", value: (row) => row.leasePeriod instanceof Date ? new Date(row.leasePeriod).toLocaleDateString() : null },
        { label: "Expiry Date", value: (row) => row.expiryDate instanceof Date ? new Date(row.expiryDate).toLocaleDateString() : null }, 
        { label: "Mothly Rent", value: "monthlyRent" },
        { label: "Property", value: "space.property.propertyName" },
        { label: "Sys User", value: "sysUser.name" },
      ],
      content: tenants,
    },
  ];

  let settings = {
    fileName: "RDRDC Tenants",
  };

  xlsx(columns, settings);
}