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
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useSession as useNextAuthSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast"
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import FileUpload from "./file-upload"
import "@uploadthing/react/styles.css";
import { Separator } from "../ui/separator"
import { z } from "zod"
import { PlusCircleIcon } from "lucide-react"
import { DatePicker } from "./customCalendar"
import { DatePicker2 } from "./dpicker"
import { Card, CardContent } from "../ui/card"

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
  monthlyRent: z.number(),
  contactNo: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  zipCode: z.string(),
  leasePeriod: z.date(),
  expiryDate: z.date(),
  tenantImage: z.string().nullable(),
  sysUserId: z.string(),
  spaceId: z.string(),
});

export function AddNewTenant() {
  const { data: session } = useNextAuthSession();
  const userId = (session?.user as User)?.id
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('');
  const [spaces, setSpaces] = useState<Spaces[]>([]);
  const [formData, setFormData] = useState({
    tenantCode: '',
    name: '',
    email: '',
    monthlyRent: '',
    contactNo: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    leasePeriod: new Date(),
    expiryDate: new Date(),
    tenantImage: '',
    spaceId: selectedSpaceId,
    sysUserId: (session?.user as User)?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchspaces', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch property data');
        }
  
        const responseData = await response.json();
        setSpaces(responseData.spaces);
        console.log(responseData.spaces);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
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
      // If the value is a Date object, convert it to a string representation
      const formattedValue = value instanceof Date ? value.toISOString() : value;
      setFormData(prevState => ({
        ...prevState,
        [key]: formattedValue,
      }));
    }
  };
  const handleSelectChange = (value: string) => {
    const selectedSpace = spaces.find(space => space.spaceName === value);
    if (selectedSpace) {
      setSelectedSpaceId(selectedSpace.id);
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
        monthlyRent: '',
        contactNo: '',
        address: '',
        city: '',
        province: '',
        zipCode: '',
        tenantImage: '',
        leasePeriod: new Date(),
        expiryDate: new Date(),
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
      <DialogContent className="sm:max-w-[600px] flex flex-col">
        <form onSubmit={handleSubmit}>
        <DialogHeader className="sm:max-w-[600px] flex flex-col items-center justify-center text-center">
          <DialogTitle>Tenants Details</DialogTitle>
          <DialogDescription>
            Fill all the required fields to add a new tenant.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Card><CardContent>
          <div className="flex">
            <div className="w-1/2 pr-4 mt-2">
                <Label htmlFor="propertyCode" className="text-right">
                  Tenant Code
                </Label>
                <Input required placeholder="Tenant Code" value={formData.tenantCode} onChange={(e) => handleChange('tenantCode', e.target.value)} className={formErrors.tenantCode ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 mt-2">
                <Label htmlFor="propertyName" className="text-right">
                  Tenant Name
                </Label>
                <Input required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className={formErrors.name ? 'invalid' : ''} />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 mt-2 pr-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
              <Input required value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={formErrors.email ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 mt-2 pr-4">
              <Label htmlFor="contactNo" className="text-right">
                Contact No.
              </Label>
              <Input required value={formData.contactNo} onChange={(e) => handleChange('contactNo', e.target.value)} className={formErrors.contactNo ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 mt-2">
              <Label htmlFor="monthlyRent" className="text-right">
                Monthly Rent
              </Label>
              <Input 
                required 
                value={formData.monthlyRent ? formData.monthlyRent.toLocaleString() : ''} 
                onChange={(e) => handleChange('monthlyRent', parseFloat(e.target.value.replace(/,/g, '')))} 
                className={formErrors.monthlyRent ? 'invalid' : ''}
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 mt-2 pr-4">
            <Label>Select Space</Label>
              <Select onValueChange={(value: string) => handleSelectChange(value)}>
              <SelectTrigger id="space" aria-label="Select space" className="w-auto">
                <SelectValue placeholder="Select space.." />
              </SelectTrigger>
              <SelectContent>
                {spaces.map(space => (
                  <SelectItem key={space.id} value={space.spaceName}>
                    {space.spaceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div className="w-1/2 mt-2 pr-4">
  <Label htmlFor="leasePeriod" className="text-right">
    Lease Period
  </Label>
  <DatePicker2
    id="leasePeriod" 
    required 
    selected={formData.leasePeriod}
    onSelect={(date: Date | undefined) => handleChange('leasePeriod', date)} 
    className={formErrors.leasePeriod ? 'invalid' : ''}
    />
</div>
<div className="w-1/2 mt-2">
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
          </div>
            <div className="flex">
              <div className="w-full mt-2">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input required value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className={formErrors.address ? 'invalid' : ''}/>
              </div>
            </div>
            <div className="flex">
            <div className="w-1/2 mt-2 pr-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
              <Input required value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className={formErrors.city ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 mt-2 pr-4">
              <Label htmlFor="province" className="text-right">
                Province
              </Label>
              <Input required value={formData.province} onChange={(e) => handleChange('province', e.target.value)} className={formErrors.province ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 mt-2">
              <Label htmlFor="zipCode" className="text-right">
                Zip Code
              </Label>
              <Input required value={formData.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} className={formErrors.zipCode ? 'invalid' : ''} />
            </div>
          </div>
          </CardContent></Card>
          </div>
          <Card className="mt-2">
            <CardContent>
              <Label>Tenant Image</Label>
          <FileUpload 
              apiEndpoint="tenantImage"
              value={formData.tenantImage} 
              onChange={(url) => url && handleChange('tenantImage', url)}
              className={`${formErrors.tenantImage ? 'invalid' : ''} items-right`}
              />
              </CardContent>
              </Card>
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
