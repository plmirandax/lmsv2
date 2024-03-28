'use client'

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useSession as useNextAuthSession } from 'next-auth/react';
import "@uploadthing/react/styles.css";
import { z } from 'zod';
import { DatePicker } from "./customCalendar";
import FileUpload from "./file-upload";
import { SelectSeparator } from "../ui/select";
import { PlusCircleIcon, PlusIcon } from "lucide-react";


interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  tenantCode: string;
  tenantImage: string | null;
}

interface Property {
  id: string;
  propertyName: string;
  propertyCode: string;
  propertyImage: string | null;
}

const spaceSchema = z.object({
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
  tenantId: z.string().nullable(),
  propertyId: z.string(),
  sysUserId: z.string(),
});

export function AddNewSpace() {
  const { data: session } = useNextAuthSession();
  const userId = (session?.user as User)?.id
  const [selectedTenantId, setSelectedTenantId] = useState<string>('');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperty] = useState<Property[]>([]);
  const [formData, setFormData] = useState({
    spaceCode: '',
    spaceName: '',
    oStatus: '',
    leasePeriod: '',
    expiryDate: new Date(),
    gFloorArea: 0,
    mezFloor: 0,
    secFloor: 0,
    thirdFloor: 0,
    roofTop: 0,
    totalArea: 0,
    monthlyRent: 0,
    spacesImage: '',
    tenantId: '', // Initialize tenantId here
    propertyId: '',
    sysUserId: (session?.user as User)?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/dropbox-tenant') // replace with your API route
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setTenants(data.tenants))
      .catch(error => console.error('Failed to fetch tenants:', error));
  }, []);

  useEffect(() => {
    console.log("Selected Tenant ID Updated:", selectedTenantId);
    // Update tenantId in formData when selectedTenantId changes
    setFormData(prevState => ({
      ...prevState,
      tenantId: selectedTenantId,
    }));
  }, [selectedTenantId]);

  useEffect(() => {
    fetch('/api/dropbox-property') // replace with your API route
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProperty(data.properties))
      .catch(error => console.error('Failed to fetch tenants:', error));
  }, []);

  useEffect(() => {
    console.log("Selected Tenant ID Updated:", selectedPropertyId);
    // Update tenantId in formData when selectedTenantId changes
    setFormData(prevState => ({
      ...prevState,
      propertyId: selectedPropertyId,
    }));
  }, [selectedPropertyId]);

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      sysUserId: userId,
    }));
  }, [userId]);

  const handleChange = (key: keyof typeof formData, value: string | number | Date | undefined) => {
    if (value !== undefined) {
      setFormData(prevState => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const userId = (session?.user as User)?.id;
      if (!userId) {
        throw new Error('User ID is not available. Please log in again.');
      }
      spaceSchema.parse(formData);
      const response = await fetch('/api/create-spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as { accessToken: string })?.accessToken}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setFormData({
        spaceCode: '',
        spaceName: '',
        oStatus: '',
        leasePeriod: '',
        expiryDate: new Date(),
        gFloorArea: 0,
        mezFloor: 0,
        secFloor: 0,
        thirdFloor: 0,
        roofTop: 0,
        totalArea: 0,
        monthlyRent: 0,
        spacesImage: '',
        tenantId: '',
        propertyId: '',
        sysUserId: userId,
      });
      toast.success('Space added successfully.');
    } catch (error) {
      const err = error as Error;
      console.error(err);
      toast.error(err.message || 'Space could not be added. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent"> <PlusCircleIcon className="pr-2" /> Add New Space</Button>
        </DialogTrigger>
        <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Space Details</DialogTitle>
            <DialogDescription>
              Fill all the required fields to add a new space.
            </DialogDescription>
            <SelectSeparator />
          </DialogHeader>
          <div className="flex flex-col py-4">
              <div className="flex">
                    <div className="w-1/2 pr-4">
                      <Label htmlFor="spaceCode" className="text-right">
                            Space Code
                      </Label>
                      <Input id="spaceCode" required value={formData.spaceCode} onChange={(e) => handleChange('spaceCode', e.target.value)} className={formErrors.spaceCode ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                      <Label htmlFor="spaceName" className="text-right">
                            Space Name
                        </Label>
                        <Input id="spaceName" required value={formData.spaceName} onChange={(e) => handleChange('spaceName', e.target.value)} className={formErrors.spaceName ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                      <Label htmlFor="oStatus" className="text-right">
                          Status
                      </Label>
                      <Input id="oStatus" required value={formData.oStatus} onChange={(e) => handleChange('oStatus', e.target.value)} className={formErrors.oStatus ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
                    <div className="w-1/2 pr-4">
                    <Label htmlFor="leasePeriod" className="text-right">
                        Lease Period
                    </Label>
                    <Input id="leasePeriod" required value={formData.leasePeriod} onChange={(e) => handleChange('leasePeriod', e.target.value)} className={formErrors.leasePeriod ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="expiryDate" className="text-right">
                  Expiry Date
                </Label>
                <DatePicker
                        id="expiryDate" 
                        required 
                        selected={formData.expiryDate}
                        onSelect={(date: Date | undefined) => handleChange('expiryDate', date)} 
                        className={formErrors.expiryDate ? 'invalid' : ''}
                        />
                  </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="gFloorArea" className="text-right">
                  Ground Floor
                </Label>
                <Input id="gFloorArea" required value={formData.gFloorArea} onChange={(e) => handleChange('gFloorArea', Number (e.target.value))} className={formErrors.gFloorArea ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
                    <div className="w-1/2 pr-4">
                    <Label htmlFor="mezFloor" className="text-right">
                  Mezzanine Floor
                </Label>
                <Input id="mezFloor" required value={formData.mezFloor} onChange={(e) => handleChange('mezFloor', Number (e.target.value))} className={formErrors.mezFloor ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="secFloor" className="text-right">
                  Second Floor
                </Label>
                <Input id="secFloor" required value={formData.secFloor} onChange={(e) => handleChange('secFloor', Number (e.target.value))} className={formErrors.secFloor ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="thirdFloor" className="text-right">
                  Third Floor
                </Label>
                <Input id="thirdFloor" required value={formData.thirdFloor} onChange={(e) => handleChange('thirdFloor', Number (e.target.value))} className={formErrors.thirdFloor ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
                    <div className="w-1/2 pr-4">
                    <Label htmlFor="roofTop" className="text-right">
                  Roof Top
                </Label>
                <Input id="roofTop" required value={formData.roofTop} onChange={(e) => handleChange('roofTop', Number (e.target.value))} className={formErrors.roofTop ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="totalArea" className="text-right">
                  Total Area
                </Label>
                <Input id="totalArea" required value={formData.totalArea} onChange={(e) => handleChange('totalArea', Number(e.target.value))} className={formErrors.totalArea ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                  <Label htmlFor="monthlyRent" className="text-right">
                  Monthly Rent
                </Label>
                <Input id="monthlyRent" required value={formData.monthlyRent} onChange={(e) => handleChange('monthlyRent', Number(e.target.value))} className={formErrors.monthlyRent ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
                  <div className="w-1/2 mt-6 pr-4">
                    <Label>Select Tenant</Label>
                    <select 
                        value={selectedTenantId} 
                        onChange={(e) => setSelectedTenantId(e.target.value)}
                        className="w-full mt-2 px-1 py-2 border dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 sm:text-sm dark:bg-gray-800 dark:text-white transition-colors duration-200 ease-in-out"
                        >
                        <option value="" className="bg-white dark:bg-gray-800 dark:text-white">Select tenant...</option>
                        {tenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id} className="bg-white dark:bg-gray-800 dark:text-white">
                        {tenant.name}
                        </option>
                        ))}
                        </select>
                        <Label>Selected Tenant ID {selectedTenantId}</Label>
                  </div>
                  <div className="w-1/2 mt-6 pl-4">
                  <Label>Select Property</Label>
                    <select 
                      value={selectedPropertyId} 
                      onChange={(e) => setSelectedPropertyId(e.target.value)}
                      className="w-full mt-2 px-1 py-2 border dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 sm:text-sm dark:bg-gray-800 dark:text-white transition-colors duration-200 ease-in-out"
                      >
                      <option value="" className="bg-white dark:bg-gray-800 dark:text-white">Select tenant...</option>
                      {properties.map((properties) => (
                      <option key={properties.id} value={properties.id} className="bg-white dark:bg-gray-800 dark:text-white">
                      {properties.propertyName}
                      </option>
                      ))}
                      </select>
                      <Label>Selected Property ID {selectedPropertyId}</Label>
                      </div>
                      </div>
              <div className="flex justify-center w-full">
              </div>
            </div>
            <FileUpload 
                apiEndpoint="spacesImage"
                value={formData.spacesImage} 
                onChange={(url) => url && handleChange('spacesImage', url)}
                className={`${formErrors.spacesImage ? 'invalid' : ''} items-right`}
              />

          <DialogFooter>
                <div className="flex justify-center w-full">
                <Button className="w-full" onClick={handleSubmit}>
          {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircledIcon className="mr-2 h-4 w-4" />}
          {isLoading ? 'Adding space...' : 'Submit'}
        </Button>
                </div>
        </DialogFooter>
    </DialogContent>
    </form>
      </Dialog>
    )
  }