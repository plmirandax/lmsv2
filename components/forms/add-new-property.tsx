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

import { z } from 'zod';

const PropertySchema = z.object({
  propertyCode: z.string().nonempty(),
  propertyName: z.string().nonempty(),
  regOwnerName: z.string().nonempty(),
  titleNo: z.string().nonempty(),
  landBuilding: z.string().nonempty(),
  lotNo: z.string().nonempty(),
  address: z.string().nonempty(),
  province: z.string().nonempty(),
  city: z.string().nonempty(),
  zipCode: z.string().nonempty(),
  classification: z.string().nonempty(),
  leasableArea: z.number().min(1),
  orate: z.number().min(1),
  taxDecNo: z.string().nonempty(),
  propertyImage: z.string().nonempty(),
  sysUserId: z.string().nonempty(),
});

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
}

export function AddNewProperty() {

  const { data: session } = useNextAuthSession()
  const userId = (session?.user as User)?.id
  const [propertyCode, setPropertyCode] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [titleNo, setTitleNo] = useState('');
  const [landBuilding, setLandBuilding] = useState('');
  const [lotNo, setLotNo] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [classification, setClassification] = useState('');
  const [leasableArea, setLeasableArea] = useState<number>(0);
  const [orate, setOrate] = useState<number>(0);
  const [taxDecNo, setTaxDecNo] = useState('');
  const [propertyImage, setPropertyImage] = useState('');
  const [sysUserId, setSysUserId] = useState(userId);

  useEffect(() => {
    setSysUserId(userId);
  }, [userId]);

  const [propertyCodeValid, setPropertyCodeValid] = useState(true);
  const [propertyNameValid, setPropertyNameValid] = useState(true);
  const [regOwnerNameValid, setregOwnerNameValid] = useState(true);
  const [titleNoValid, settitleNoValid] = useState(true);
  const [landBuildingValid, setlandBuildingValid] = useState(true);
  const [lotNoValid, setlotNoValid] = useState(true);
  const [addressValid, setaddressValid] = useState(true);
  const [provinceValid, setprovinceValid] = useState(true);
  const [cityValid, setcityValid] = useState(true);
  const [zipCodeValid, setzipCodeValid] = useState(true);
  const [classificationValid, setclassificationValid] = useState(true);
  const [leaseAreaValid, setleaseAreaValid] = useState(true);
  const [taxDecNoValid, settaxDecNoValid] = useState(true);
  const [orateValid, setorateValid] = useState(true);
  const [propertyImageValid, setPropertyImageValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setIsLoading(true);

  const data = {
    propertyCode,
    propertyName,
    regOwnerName,
    titleNo,
    landBuilding,
    lotNo,
    address,
    province,
    city,
    zipCode,
    classification,
    leasableArea,
    propertyImage,
    orate,
    taxDecNo,
    sysUserId
  };

  const result = PropertySchema.safeParse(data);

  if (!result.success) {
    toast.error('All fields are required.');
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch('/api/create-property', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(session as { accessToken: string })?.accessToken}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    setPropertyCode('');
    setPropertyName('');
    setRegOwnerName('');
    setTitleNo('');
    setLandBuilding('');
    setLotNo('');
    setAddress('');
    setProvince('');
    setCity('');
    setZipCode('');
    setClassification('');
    setLeasableArea(0);
    setOrate(0);
    setTaxDecNo('');
    setPropertyImage('');
    setIsLoading(false);
    const responseData = await response.json();
    toast.success('Property added successfully.');
  } catch (error) {
    toast.error('Property could not be added. Please try again.');
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="propertyCode" className="text-right">
                  Property Code
                </Label>
                <Input id="propertyCode" required value={propertyCode} onChange={(e) => setPropertyCode(e.target.value)} className={propertyCodeValid ? '' : 'invalid'}/>
                <Label htmlFor="propertyName" className="text-right">
                  Property Name
                </Label>
                <Input id="propertyName" required value={propertyName} onChange={(e) => setPropertyName(e.target.value)} className={propertyNameValid ? '' : 'invalid'}/>
                <Label htmlFor="regOwnerName" className="text-right">
                  Registered Owner
                </Label>
                <Input id="regOwnerName" required value={regOwnerName} onChange={(e) => setRegOwnerName(e.target.value)} className={regOwnerNameValid ? '' : 'invalid'}/>
              </div>
              <div>
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" required value={address} onChange={(e) => setAddress(e.target.value)} className={addressValid ? '' : 'invalid'}/>
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input id="city" required value={city} onChange={(e) => setCity(e.target.value)} className={cityValid ? '' : 'invalid'}/>
                <Label htmlFor="province" className="text-right">
                  Province
                </Label>
                <Input id="province" required value={province} onChange={(e) => setProvince(e.target.value)} className={provinceValid ? '' : 'invalid'}/>
                <Label htmlFor="zipCode" className="text-right">
                  Zip Code
                </Label>
                <Input id="zipCode" required value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={zipCodeValid ? '' : 'invalid'}/>
              </div>
              <div>
                <Label htmlFor="titleNo" className="text-right">
                  Title No.
                </Label>
                <Input id="titleNo" required value={titleNo} onChange={(e) => setTitleNo(e.target.value)} className={titleNoValid ? '' : 'invalid'}/>
                <Label htmlFor="landBuilding" className="text-right">
                  Land/Improvement/Building
                </Label>
                <Input id="landBuilding" required value={landBuilding} onChange={(e) => setLandBuilding(e.target.value)} className={landBuildingValid ? '' : 'invalid'}/>
                <Label htmlFor="lotNo" className="text-right">
                  Lot. No.
                </Label>
                <Input id="lotNo" required value={lotNo} onChange={(e) => setLotNo(e.target.value)} className={lotNoValid ? '' : 'invalid'}/>
                <Label htmlFor="classification" className="text-right">
                  Classification
                </Label>
                <Input id="classification" required value={classification} onChange={(e) => setClassification(e.target.value)} className={classificationValid ? '' : 'invalid'}/>
              </div>
              <div>
                <Label htmlFor="leasableArea" className="text-right">
                  Leasable Space
                </Label>
                <Input id="leasableArea" required value={leasableArea} onChange={(e) => setLeasableArea(Number(e.target.value))} className={leaseAreaValid ? '' : 'invalid'}/>
                <Label htmlFor="orate" className="text-right">
                  Occupancy Rate
                </Label>
                <Input id="orate" required value={orate} onChange={(e) => setOrate(Number(e.target.value))} className={orateValid ? '' : 'invalid'}/>
                <Label htmlFor="taxDecNo" className="text-right">
                  Tax Declaration No.
                </Label>
                <Input id="taxDecNo" required value={taxDecNo} onChange={(e) => setTaxDecNo(e.target.value)} className={taxDecNoValid ? '' : 'invalid'}/>
                <FileUpload 
                    apiEndpoint="propertyImage"
                    value={propertyImage} 
                    onChange={(url) => url && setPropertyImage(url)}
                    className={propertyImageValid ? '' : 'invalid'}
                    />
              </div> 
            </div>
            <div className="flex flex-col justify-center items-center">
            </div>
          </div>
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