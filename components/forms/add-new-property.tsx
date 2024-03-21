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
  const [location, setLocation] = useState('');
  const [cityRegion, setCityRegion] = useState('');
  const [classification, setClassification] = useState('');
  const [leasableArea, setLeasableArea] = useState('');
  const [orate, setOrate] = useState('');
  const [taxDecNo, setTaxDecNo] = useState('');
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
  const [locationValid, setlocationValid] = useState(true);
  const [cityRegionValid, setcityRegionValid] = useState(true);
  const [classificationValid, setclassificationValid] = useState(true);
  const [leaseAreaValid, setleaseAreaValid] = useState(true);
  const [taxDecNoValid, settaxDecNoValid] = useState(true);
  const [orateValid, setorateValid] = useState(true);
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
    const islocationCodeValid = location.trim() !== '';
    const iscityRegionValid = cityRegion.trim() !== '';
    const isclassificationValid = classification.trim() !== '';
    const isleasableAreaCodeValid = leasableArea.trim() !== '';
    const isorateValid = orate.trim() !== '';
    const istaxDecValid = taxDecNo.trim() !== '';

    setPropertyCodeValid(isPropertyCodeValid);
    setPropertyNameValid(isPropertyNameValid);
    setregOwnerNameValid(isregOwnerNameValid);
    settitleNoValid(istitleNoValid);
    setlandBuildingValid(islandBuildingValid);
    setlotNoValid(islotNoValid);
    setlocationValid(islocationCodeValid);
    setcityRegionValid(iscityRegionValid);
    setclassificationValid(isclassificationValid);
    setleaseAreaValid(isleasableAreaCodeValid);
    setorateValid(isorateValid);
    settaxDecNoValid(istaxDecValid);

    if (!isPropertyCodeValid || !isPropertyNameValid ||
       !isregOwnerNameValid || !istitleNoValid ||
        !islandBuildingValid || !islotNoValid ||
         !islocationCodeValid || !iscityRegionValid ||
          !isclassificationValid || !isleasableAreaCodeValid ||
           !isorateValid || !istaxDecValid) {
            toast.error('All fields are required.');
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
      location,
      cityRegion,
      classification,
      leasableArea,
      orate,
      taxDecNo,
      sysUserId
    };
  
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
    setLocation('');
    setCityRegion('');
    setClassification('');
    setLeasableArea('');
    setOrate('');
    setTaxDecNo('');
    setIsLoading(false);
  
      const responseData = await response.json();
      toast.success('Property added successfully.');
  
      // Handle response data...
    } catch (error) {
      setIsLoading(false);
      toast.error('Property could not be added. Please try again.');
      // Handle error here...
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
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" required value={location} onChange={(e) => setLocation(e.target.value)} className={locationValid ? '' : 'invalid'}/>
                <Label htmlFor="cityRegion" className="text-right">
                  City/Region
                </Label>
                <Input id="cityRegion" required value={cityRegion} onChange={(e) => setCityRegion(e.target.value)} className={cityRegionValid ? '' : 'invalid'}/>
                <Label htmlFor="classification" className="text-right">
                  Classification
                </Label>
                <Input id="classification" required value={classification} onChange={(e) => setClassification(e.target.value)} className={classificationValid ? '' : 'invalid'}/>
              </div>
              <div>
                <Label htmlFor="leasableArea" className="text-right">
                  Leasable Space
                </Label>
                <Input id="leasableArea" required value={leasableArea} onChange={(e) => setLeasableArea(e.target.value)} className={leaseAreaValid ? '' : 'invalid'}/>
                <Label htmlFor="orate" className="text-right">
                  Occupancy Rate
                </Label>
                <Input id="orate" required value={orate} onChange={(e) => setOrate(e.target.value)} className={orateValid ? '' : 'invalid'}/>
                <Label htmlFor="taxDecNo" className="text-right">
                  Tax Declaration
                </Label>
                <Input id="taxDecNo" required value={taxDecNo} onChange={(e) => setTaxDecNo(e.target.value)} className={taxDecNoValid ? '' : 'invalid'}/>
              </div> 
            </div>
            <div className="flex flex-col justify-center items-center">
            </div>
          </div>
          <DialogFooter>
                <div className="flex justify-center w-full">
                <Button onClick={handleSubmit} disabled={isLoading} className="flex justify-center items-center">
                  {isLoading ? <div className="spinner"></div> : 'Submit'}
                </Button>
                </div>
        </DialogFooter>
    </DialogContent>
    </form>
      </Dialog>
    )
  }