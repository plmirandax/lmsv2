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

  
  // Create state variables for each input field
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

    const isPropertyCodeValid = propertyCode.trim() !== '';
    const isPropertyNameValid = propertyName.trim() !== '';
    const isregOwnerNameValid = regOwnerName.trim() !== '';
    const istitleNoValid = titleNo.trim() !== '';
    const islandBuildingValid = landBuilding.trim() !== '';
    const islotNoValid = lotNo.trim() !== '';
    const isAddressValid = address.trim() !== '';
    const isProvinceValid = province.trim() !== '';
    const isCityValid = city.trim() !== '';
    const isZipCodeValid = zipCode.trim() !== '';
    const isclassificationValid = classification.trim() !== '';
    const isLeasableAreaCodeValid = leasableArea !== 0;
    const isorateValid = orate !== 0;
    const istaxDecValid = taxDecNo.trim() !== '';
    const ispropertyImageValid = propertyImage.trim() !== '';

    setPropertyCodeValid(isPropertyCodeValid);
    setPropertyNameValid(isPropertyNameValid);
    setregOwnerNameValid(isregOwnerNameValid);
    settitleNoValid(istitleNoValid);
    setlandBuildingValid(islandBuildingValid);
    setlotNoValid(islotNoValid);
    setaddressValid(isAddressValid);
    setprovinceValid(isProvinceValid);
    setcityValid(isCityValid);
    setzipCodeValid(isZipCodeValid);
    setclassificationValid(isclassificationValid);
    setleaseAreaValid(isLeasableAreaCodeValid);
    setorateValid(isorateValid);
    settaxDecNoValid(istaxDecValid);
    setPropertyImageValid(ispropertyImageValid);

    if (!isPropertyCodeValid || !isPropertyNameValid ||
       !isregOwnerNameValid || !istitleNoValid ||
        !islandBuildingValid || !islotNoValid ||
          !isAddressValid || !isProvinceValid ||
            !isCityValid || !isZipCodeValid ||
          !isclassificationValid || !isLeasableAreaCodeValid ||
           !isorateValid || !istaxDecValid || !ispropertyImageValid) {
            toast.error('All fields are required.');
            setIsLoading(false);
      return;
    }
    
    // Create data object with input values
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

    console.log(data);
  
    try {
      // Send POST request to /api/create-property
      const response = await fetch('/api/create-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as { accessToken: string })?.accessToken}` // Include the user's session token in the headers
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
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
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-right">
                  Zip Code
                </Label>
                <Input id="zipCode" required value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={zipCodeValid ? '' : 'invalid'}/>
                <Label htmlFor="leasableArea" className="text-right">
                  Leasable Space
                </Label>
                <Input id="leasableArea" required value={leasableArea} onChange={(e) => setLeasableArea(Number(e.target.value))} className={leaseAreaValid ? '' : 'invalid'}/>
                <Label htmlFor="orate" className="text-right">
                  Occupancy Rate
                </Label>
                <Input id="orate" required value={orate} onChange={(e) => setOrate(Number(e.target.value))} className={orateValid ? '' : 'invalid'}/>
              </div>
              <div>
                <Label htmlFor="classification" className="text-right">
                  Classification
                </Label>
                <Input id="classification" required value={classification} onChange={(e) => setClassification(e.target.value)} className={classificationValid ? '' : 'invalid'}/>
                <Label htmlFor="taxDecNo" className="text-right">
                  Tax Declaration No.
                </Label>
                <Input id="taxDecNo" required value={taxDecNo} onChange={(e) => setTaxDecNo(e.target.value)} className={taxDecNoValid ? '' : 'invalid'}/>
              </div> 
              <FileUpload 
  apiEndpoint="propertyImage"
  value={propertyImage} 
  onChange={(url) => url && setPropertyImage(url)}
  className={propertyImageValid ? '' : 'invalid'}
  height="48"
/>
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