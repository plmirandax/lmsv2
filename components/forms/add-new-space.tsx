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
import FileUpload from "./file-upload";
import { SelectGroup } from "../ui/select";
import { PlusCircleIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent } from "../ui/card";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
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
  gFloorArea: z.number(),
  mezFloor: z.number(),
  secFloor: z.number(),
  thirdFloor: z.number(),
  roofTop: z.number(),
  totalArea: z.number(),
  spacesImage: z.string(),
  tenantId: z.string().nullable(),
  propertyId: z.string(),
  sysUserId: z.string(),
});

export function AddNewSpace() {
  const { data: session } = useNextAuthSession();
  const userId = (session?.user as User)?.id
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [properties, setProperty] = useState<Property[]>([]);
  const [formData, setFormData] = useState({
    spaceCode: '',
    spaceName: '',
    oStatus: '',
    gFloorArea: 0,
    mezFloor: 0,
    secFloor: 0,
    thirdFloor: 0,
    roofTop: 0,
    totalArea: 0, // Initialize total area to 0
    spacesImage: '',
    tenantId: '', // Initialize tenantId here
    propertyId: '',
    sysUserId: (session?.user as User)?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  // Function to calculate total area
  useEffect(() => {
    const { gFloorArea, mezFloor, secFloor, thirdFloor, roofTop } = formData;
    const totalArea = gFloorArea + mezFloor + secFloor + thirdFloor + roofTop;
    setFormData(prevState => ({
      ...prevState,
      totalArea,
    }));
  }, [formData.gFloorArea, formData.mezFloor, formData.secFloor, formData.thirdFloor, formData.roofTop]);

  const handleChange = (key: keyof typeof formData, value: string | number | Date | undefined) => {
    if (value !== undefined) {
      setFormData(prevState => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value); // Update the selected status
    setFormData(prevState => ({
      ...prevState,
      oStatus: value, // Update the oStatus in formData
    }));
  };

  const handleSelectChange = (value: string) => {
    const selectedProperty = properties.find(properties => properties.propertyName === value);
    if (selectedProperty) {
      setSelectedPropertyId(selectedProperty.id);
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
        gFloorArea: 0,
        mezFloor: 0,
        secFloor: 0,
        thirdFloor: 0,
        roofTop: 0,
        totalArea: 0,
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
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Space Details</DialogTitle>
            <DialogDescription>
              Fill all the required fields to add a new space.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
              <Card>
                <CardContent>
                  <div className="flex mt-6">
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
                  </div>
                  <div className="flex">
                  <div className="w-1/2 mt-2 pr-4">
                      <Label htmlFor="oStatus" className="text-right">
                      Status
                      </Label>
                      <Select onValueChange={handleStatusChange}>
                      <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectGroup>
                      <SelectItem value="Vacant" onSelect={() => handleStatusChange('Vacant')}>
                      Vacant
                      </SelectItem>
                      <SelectItem value="Occupied" onSelect={() => handleStatusChange('Occupied')}>
                      Occupied
                      </SelectItem>
                      <SelectItem value="Under Renovation" onSelect={() => handleStatusChange('Under Renovation')}>
                      Under Renovation
                      </SelectItem>
                      </SelectGroup>
                      </SelectContent>
                      </Select>
                  </div>

                  <div className="w-1/2 mt-2 pl-4">
                  <Label>Select Property</Label>
                  <Select onValueChange={(value: string) => handleSelectChange(value)}>
                  <SelectTrigger id="status" aria-label="Select status">
                  <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                  {properties.map(properties => (
                  <SelectItem key={properties.id} value={properties.propertyName}>
                  {properties.propertyName}
                  </SelectItem>
                  ))}
                  </SelectContent>
                  </Select>
              </div>

              </div>
              </CardContent>
              </Card>
              <Card className="mt-4">
                <CardContent>
              <div className="flex mt-4">
              <div className="w-1/2 pr-4">
                  <Label htmlFor="gFloorArea" className="text-right">
                  Ground Floor
                </Label>
                <Input id="gFloorArea" required value={formData.gFloorArea} onChange={(e) => handleChange('gFloorArea', Number (e.target.value))} className={formErrors.gFloorArea ? 'invalid' : ''}/>
                  </div>
                    <div className="w-1/2 pr-4 pl-2">
                    <Label htmlFor="mezFloor" className="text-right">
                  Mezzanine Floor
                </Label>
                <Input id="mezFloor" required value={formData.mezFloor} onChange={(e) => handleChange('mezFloor', Number (e.target.value))} className={formErrors.mezFloor ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-2">
                  <Label htmlFor="secFloor" className="text-right">
                  Second Floor
                </Label>
                <Input id="secFloor" required value={formData.secFloor} onChange={(e) => handleChange('secFloor', Number (e.target.value))} className={formErrors.secFloor ? 'invalid' : ''}/>
                  </div>
              </div>
              <div className="flex">
              <div className="w-1/2 mt-2 pr-4">
                  <Label htmlFor="thirdFloor" className="text-right">
                  Third Floor
                </Label>
                <Input id="thirdFloor" required value={formData.thirdFloor} onChange={(e) => handleChange('thirdFloor', Number (e.target.value))} className={formErrors.thirdFloor ? 'invalid' : ''}/>
                  </div>
                    <div className="w-1/2 mt-2 pl-2 pr-4">
                    <Label htmlFor="roofTop" className="text-right pl-12">
                  Roof Top
                </Label>
                <Input id="roofTop" required value={formData.roofTop} onChange={(e) => handleChange('roofTop', Number (e.target.value))} className={formErrors.roofTop ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 mt-1 pl-2">
                  <Label htmlFor="totalArea" className="text-center pl-12">
                  Total Area
                </Label>
                <Input 
                id="totalArea"
                disabled
                value={formData.totalArea} // Display totalArea from formData
                readOnly // Make the input field read-only to prevent user input
                className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
                  </div>
              </div>
              </CardContent>
              </Card>
            </div>
            
            <Card className="item-center justify-center flex flex-col">
              <CardContent>
                <Label className="flex flex-col item-center pt-2">Space Image</Label>
          <FileUpload 
                apiEndpoint="spacesImage"
                value={formData.spacesImage} 
                onChange={(url) => url && handleChange('spacesImage', url)}
                className={`${formErrors.spacesImage ? 'invalid' : ''} items-right pt-2`}
              />
              </CardContent>
              </Card>
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