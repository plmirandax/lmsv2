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
import { SelectSeparator } from "../../components/ui/select"
import { useSession as useNextAuthSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast"
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import FileUpload from "./file-upload"
import "@uploadthing/react/styles.css";
import { Separator } from "../ui/separator"
import { z } from "zod"
import { PlusCircleIcon } from "lucide-react"

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
}

interface Spaces{ 
  id: string
  spaceName: string
}

const tenantSchema = z.object({
  tenantCode: z.string(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  contactNo: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  zipCode: z.string(),
  tenantImage: z.string().nullable(),
  sysUserId: z.string(),
  spaceId: z.string(),
});

export function AddNewTenant() {
  const { data: session } = useNextAuthSession();
  const userId = (session?.user as User)?.id
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('');
  const [spacex, setSpaces] = useState<Spaces[]>([]);
  const [formData, setFormData] = useState({
    tenantCode: '',
    name: '',
    email: '',
    passwordHash: '',
    contactNo: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    tenantImage: '',
    spaceId: selectedSpaceId,
    sysUserId: (session?.user as User)?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/fetchspaces') // replace with your API route
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSpaces(data.spaces))
      .catch(error => console.error('Failed to fetch tenants:', error));
  }, []);

  useEffect(() => {
    console.log("Selected Tenant ID Updated:", selectedSpaceId);
    // Update tenantId in formData when selectedTenantId changes
    setFormData(prevState => ({
      ...prevState,
      spaceId: selectedSpaceId,
    }));
  }, [selectedSpaceId]);

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
      tenantSchema.parse(formData);
      const response = await fetch('/api/create-tenant', {
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
        tenantCode: '',
        name: '',
        email: '',
        passwordHash: '',
        contactNo: '',
        address: '',
        city: '',
        province: '',
        zipCode: '',
        tenantImage: '',
        sysUserId: userId,
        spaceId: '',
      });
      toast.success('Tenant added successfully.');
    } catch (error) {
      const err = error as Error;
      console.error(err);
      toast.error(err.message || 'Tenant could not be added. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> <PlusCircleIcon className="pr-2"/> Add New Tenant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Tenants Details</DialogTitle>
          <DialogDescription>
            Fill all the required fields to add a new tenant.
          </DialogDescription>
          <SelectSeparator />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex">
            <div className="w-1/2 pr-4">
                <Label htmlFor="propertyCode" className="text-right">
                  Tenant Code
                </Label>
                <Input required value={formData.tenantCode} onChange={(e) => handleChange('tenantCode', e.target.value)} className={formErrors.tenantCode ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 pr-4">
                <Label htmlFor="propertyName" className="text-right">
                  Tenant Name
                </Label>
                <Input required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className={formErrors.name ? 'invalid' : ''} />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
              <Input required value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={formErrors.email ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 pr-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input required type='password' value={formData.passwordHash} onChange={(e) => handleChange('passwordHash', e.target.value)} className={formErrors.passwordHash ? 'invalid' : ''}/>
            </div>
            <div className="w-1/2 pr-4">
              <Label htmlFor="contactNo" className="text-right">
                Contact No.
              </Label>
              <Input required value={formData.contactNo} onChange={(e) => handleChange('contactNo', e.target.value)} className={formErrors.contactNo ? 'invalid' : ''} />
            </div>
          </div>
            <div>
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input required value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className={formErrors.address ? 'invalid' : ''}/>
            </div>
            <div className="flex">
            <div className="w-1/2 pr-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
              <Input required value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className={formErrors.city ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 pr-4">
              <Label htmlFor="province" className="text-right">
                Province
              </Label>
              <Input required value={formData.province} onChange={(e) => handleChange('province', e.target.value)} className={formErrors.province ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 pr-4">
              <Label htmlFor="zipCode" className="text-right">
                Zip Code
              </Label>
              <Input required value={formData.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} className={formErrors.zipCode ? 'invalid' : ''} />
            </div>
          </div>
          <div className="flex">
              <div className="w-1/2 mt-4 pr-4">
              <Label>Select Space</Label>
                    <select 
                      value={selectedSpaceId} 
                      onChange={(e) => setSelectedSpaceId(e.target.value)}
                      className="w-full mt-2 px-1 py-2 border dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 sm:text-sm dark:bg-gray-800 dark:text-white transition-colors duration-200 ease-in-out"
                      >
                      <option value="" className="bg-white dark:bg-gray-800 dark:text-white">Select space...</option>
                      {spacex.map((spaces) => (
                      <option key={spaces.id} value={spaces.id} className="mt-1 bg-white dark:bg-gray-800 dark:text-white">
                      {spaces.spaceName}
                      </option>
                      ))}
                      </select>
                      <Label>ID: {selectedSpaceId}</Label>
              </div>
          </div>
          </div>
          <div className="flex flex-col justify-center items-center">
          </div>
          <FileUpload 
              apiEndpoint="tenantImage"
              value={formData.tenantImage} 
              onChange={(url) => url && handleChange('tenantImage', url)}
              className={`${formErrors.tenantImage ? 'invalid' : ''} items-right`}
              />
          <div className="flex flex-col justify-center items-center">
              <Separator />
          </div>
          <DialogFooter className="mt-4">
              <div className="flex justify-center w-full">
              <Button className="w-full" type="submit">
                {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircledIcon className="mr-2 h-4 w-4" />}
                {isLoading ? 'Adding tenant..' : 'Submit'}
              </Button>
              </div>
          </DialogFooter>
        </form>
  </DialogContent>
    </Dialog>
    )
  }
