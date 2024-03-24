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


interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
}

export function AddNewTenant() {

  const { data: session } = useNextAuthSession()

  const userId = (session?.user as User)?.id

  
  // Create state variables for each input field
  const [tenantCode, setTenantCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [tenantImage, setTenantImage] = useState('');
  const [UserId, setUserId] = useState(userId);

  useEffect(() => {
    setUserId(userId);
  }, [userId]);
  const [tenantCodeValid, setTenantCodeValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [contactNoValid, setContactNoValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);
  const [provinceValid, setProvinceValid] = useState(true);
  const [zipCodeValid, setZipCodeValid] = useState(true);
  const [tenantImageValid, setTenantImageValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    const isTenantCodeValid = tenantCode.trim() !== '';
    const isNameValid = name.trim() !== '';
    const isEmailValid = email.trim() !== '';
    const isPasswordValid = password.trim() !== '';
    const isContactNoValid = contactNo.trim() !== '';
    const isAddressValid = address.trim() !== '';
    const isCityValid = city.trim() !== '';
    const isProvinceValid = province.trim() !== '';
    const isZipCodeValid = zipCode.trim() !== '';
 


    setTenantCodeValid(isTenantCodeValid);
    setNameValid(isNameValid);
    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);
    setContactNoValid(isContactNoValid);
    setAddressValid(isAddressValid);
    setCityValid(isCityValid);
    setProvinceValid(isProvinceValid);
    setZipCodeValid(isZipCodeValid);
    

    if (!isTenantCodeValid ||
        !isNameValid ||
        !isEmailValid ||
        !isPasswordValid ||
        !isContactNoValid ||
        !isCityValid ||
        !isProvinceValid ||
        !isZipCodeValid ||
        !isAddressValid ) {
            toast.error('All fields are required.');
      return;
    }
    
    // Create data object with input values
    const data = {
      tenantCode,
      name,
      email,
      password,
      contactNo,
      address,
      city,
      province,
      zipCode,
      tenantImage,
      UserId
    };
  
    try {
      // Send POST request to /api/create-property
      const response = await fetch('/api/create-tenant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}` // Include the user's session token in the headers
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setTenantCode('');
      setName('');
      setEmail('');
      setPassword('');
      setContactNo('');
      setAddress('');
      setCity('');
      setProvince('');
      setZipCode('');
      setTenantImage('');
      
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
          <Button variant="outline">Add New Tenant</Button>
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
                  <Input id="propertyCode" required value={tenantCode} onChange={(e) => setTenantCode(e.target.value)} className={tenantCodeValid ? '' : 'invalid'}/>
              </div>
              <div className="w-1/2 pr-4">
                  <Label htmlFor="propertyName" className="text-right">
                    Tenant Name
                  </Label>
                  <Input id="propertyName" required value={name} onChange={(e) => setName(e.target.value)} className={nameValid ? '' : 'invalid'}/>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={emailValid ? '' : 'invalid'}/>
              </div>
              <div className="w-1/2 pr-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={passwordValid ? '' : 'invalid'}/>
              </div>
              <div className="w-1/2 pr-4">
                <Label htmlFor="contactNo" className="text-right">
                  Contact No.
                </Label>
                <Input id="contactNo" required value={contactNo} onChange={(e) => setContactNo(e.target.value)} className={contactNoValid ? '' : 'invalid'}/>
              </div>
            </div>
              <div>
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" required value={address} onChange={(e) => setAddress(e.target.value)} className={addressValid ? '' : 'invalid'}/>
              </div>
              <div className="flex">
              <div className="w-1/2 pr-4">
                  <Label htmlFor="city" className="text-right">
                    City
                  </Label>
                <Input id="city" required value={city} onChange={(e) => setCity(e.target.value)} className={cityValid ? '' : 'invalid'}/>
              </div>
              <div className="w-1/2 pr-4">
                <Label htmlFor="province" className="text-right">
                  Province
                </Label>
                <Input id="province" required value={province} onChange={(e) => setProvince(e.target.value)} className={provinceValid ? '' : 'invalid'}/>
              </div>
              <div className="w-1/2 pr-4">
                <Label htmlFor="zipCode" className="text-right">
                  Zip Code
                </Label>
                <Input id="zipCode" required value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={zipCodeValid ? '' : 'invalid'}/>
              </div>
            </div>
            </div>
            <div className="flex flex-col justify-center items-center">
            </div>
            <FileUpload 
                apiEndpoint="propertyImage"
                value={tenantImage} 
                onChange={(url) => url && setTenantImage(url)}
                className={`${tenantImageValid ? '' : 'invalid'} items-right`}
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