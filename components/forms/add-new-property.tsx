'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectSeparator } from "../ui/select"
import { useSession as useNextAuthSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast"
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import FileUpload from "./file-upload"
import "@uploadthing/react/styles.css";
import { z } from 'zod';

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
}

// Zod schema for data validation
const propertySchema = z.object({
  propertyCode: z.string(),
  propertyName: z.string(),
  regOwnerName: z.string(),
  titleNo: z.string(),
  landBuilding: z.string(),
  lotNo: z.string(),
  address: z.string(),
  province: z.string(),
  city: z.string(),
  zipCode: z.string(),
  classification: z.string(),
  leasableArea: z.number(),
  orate: z.number(),
  taxDecNo: z.string(),
  propertyImage: z.string(),
  sysUserId: z.string(),
});

export function AddNewProperty() {

  const { data: session } = useNextAuthSession()

  const userId = (session?.user as User)?.id

  // Create state variables for each input field
  const [formData, setFormData] = useState({
    propertyCode: '',
    propertyName: '',
    regOwnerName: '',
    titleNo: '',
    landBuilding: '',
    lotNo: '',
    address: '',
    province: '',
    city: '',
    zipCode: '',
    classification: '',
    leasableArea: 0,
    orate: 0,
    taxDecNo: '',
    propertyImage: '',
    sysUserId: userId,
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      sysUserId: userId,
    }));
  }, [userId]);

  const handleChange = (key: keyof typeof formData, value: string | number) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      // Validate form data using Zod schema
      propertySchema.parse(formData);

      // Send POST request to /api/create-property
      const response = await fetch('/api/create-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as { accessToken: string })?.accessToken}` // Include the user's session token in the headers
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setFormData({
        propertyCode: '',
        propertyName: '',
        regOwnerName: '',
        titleNo: '',
        landBuilding: '',
        lotNo: '',
        address: '',
        province: '',
        city: '',
        zipCode: '',
        classification: '',
        leasableArea: 0,
        orate: 0,
        taxDecNo: '',
        propertyImage: '',
        sysUserId: userId,
      });

      toast.success('Property added successfully.');
  
      // Handle response data...
    } catch (error) {
      toast.error('Property could not be added. Please try again.');
      // Handle error here...
    }
    finally {
      setIsLoading(false);
    }
  };
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Property</Button>
        </DialogTrigger>
        <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
            <DialogDescription>
              Fill all the required fields to add a new property.
            </DialogDescription>
            <SelectSeparator />
          </DialogHeader>
          <div className="flex flex-col py-4">
              <div className="flex">
                    <div className="w-1/2 pr-4">
                      <Label htmlFor="propertyCode" className="text-right">
                            Property Code
                      </Label>
                       <Input id="propertyCode" required value={formData.propertyCode} onChange={(e) => handleChange('propertyCode', e.target.value)} className={formErrors.propertyCode ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                      <Label htmlFor="propertyName" className="text-right">
                            Property Name
                        </Label>
                        <Input id="propertyName" required value={formData.propertyName} onChange={(e) => handleChange('propertyName', e.target.value)} className={formErrors.propertyName ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                      <Label htmlFor="regOwnerName" className="text-right">
                           Registered Owner
                      </Label>
                      <Input id="regOwnerName" required value={formData.regOwnerName} onChange={(e) => handleChange('regOwnerName', e.target.value)} className={formErrors.regOwnerName ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
                    <div className="w-1/2 pr-4">
                    <Label htmlFor="titleNo" className="text-right">
                        Title No.
                    </Label>
                    <Input id="titleNo" required value={formData.titleNo} onChange={(e) => handleChange('titleNo', e.target.value)} className={formErrors.titleNo ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="landBuilding" className="text-right">
                  Land/Improvement/Building
                </Label>
                <Input id="landBuilding" required value={formData.landBuilding} onChange={(e) => handleChange('landBuilding', e.target.value)} className={formErrors.landBuilding ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="lotNo" className="text-right">
                  Lot. No.
                </Label>
                <Input id="lotNo" required value={formData.lotNo} onChange={(e) => handleChange('lotNo', e.target.value)} className={formErrors.lotNo ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
                    <div className="w-1/2 pr-4">
                    <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" required value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className={formErrors.address ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input id="city" required value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className={formErrors.city ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="province" className="text-right">
                  Province
                </Label>
                <Input id="province" required value={formData.province} onChange={(e) => handleChange('province', e.target.value)} className={formErrors.province ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
                    <div className="w-1/2 pr-4">
                    <Label htmlFor="zipCode" className="text-right">
                  Zip Code
                </Label>
                <Input id="zipCode" required value={formData.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} className={formErrors.zipCode ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="leasableArea" className="text-right">
                  Leasable Space
                </Label>
                <Input id="leasableArea" required value={formData.leasableArea} onChange={(e) => handleChange('leasableArea', Number(e.target.value))} className={formErrors.leasableArea ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="orate" className="text-right">
                  Occupancy Rate
                </Label>
                <Input id="orate" required value={formData.orate} onChange={(e) => handleChange('orate', Number(e.target.value))} className={formErrors.orate ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
                    <div className="w-1/2 pr-4">
                    <Label htmlFor="classification" className="text-right">
                  Classification
                </Label>
                <Input id="classification" required value={formData.classification} onChange={(e) => handleChange('classification', e.target.value)} className={formErrors.classification ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="taxDecNo" className="text-right">
                  Tax Declaration No.
                </Label>
                <Input id="taxDecNo" required value={formData.taxDecNo} onChange={(e) => handleChange('taxDecNo', e.target.value)} className={formErrors.taxDecNo ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                <div className="w-1/2 pl-4">
                  <Label htmlFor="taxDecNo" className="text-right">
                  Status
                </Label>
                <Input />
                  </div>
                  </div>
              </div>
              <div className="flex justify-center w-full">
              </div>
            </div>
            <FileUpload 
                apiEndpoint="propertyImage"
                value={formData.propertyImage} 
                onChange={(url) => url && handleChange('propertyImage', url)}
                className={`${formErrors.propertyImage ? 'invalid' : ''} items-right`}
              />

          <DialogFooter>
                <div className="flex justify-center w-full">
                <Button className="w-full" onClick={handleSubmit}>
          {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircledIcon className="mr-2 h-4 w-4" />}
          {isLoading ? 'Adding property..' : 'Submit'}
        </Button>
                </div>
        </DialogFooter>
    </DialogContent>
    </form>
      </Dialog>
    )
  }