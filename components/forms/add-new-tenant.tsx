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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [tenantImage, setTenantImage] = useState('');
  const [UserId, setUserId] = useState(userId);

  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [contactNoValid, setContactNoValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const isNameValid = name.trim() !== '';
    const isEmailValid = email.trim() !== '';
    const isPasswordValid = password.trim() !== '';
    const isContactNoValid = contactNo.trim() !== '';
    const isAddressValid = address.trim() !== '';



    setNameValid(isNameValid);
    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);
    setContactNoValid(isContactNoValid);
    setAddressValid(isAddressValid);

    if (!isNameValid ||
        !isEmailValid ||
        !isPasswordValid ||
        !isContactNoValid ||
        !isAddressValid ) {
            toast.error('All fields are required.');
      return;
    }
    
    // Create data object with input values
    const data = {
      name,
      email,
      password,
      contactNo,
      address,
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

      setName('');
      setEmail('');
      setPassword('');
      setContactNo('');
      setAddress('');
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
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tenants Details</DialogTitle>
            <DialogDescription>
              Fill all the required fields to add a new tenant.
            </DialogDescription>
            <SelectSeparator />
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyCode" className="text-right">
                  Tenant Name
                </Label>
                <Input id="propertyCode" required value={name} onChange={(e) => setName(e.target.value)} className={nameValid ? '' : 'invalid'}/>
                <Label htmlFor="propertyName" className="text-right">
                  Email
                </Label>
                <Input id="propertyName" required value={email} onChange={(e) => setEmail(e.target.value)} className={emailValid ? '' : 'invalid'}/>
                <Label htmlFor="regOwnerName" className="text-right">
                  Password
                </Label>
                <Input id="regOwnerName" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={passwordValid ? '' : 'invalid'}/>
              </div>
              <div>
                <Label htmlFor="titleNo" className="text-right">
                  Contact No.
                </Label>
                <Input id="titleNo" required value={contactNo} onChange={(e) => setContactNo(e.target.value)} className={contactNoValid ? '' : 'invalid'}/>
                <Label htmlFor="landBuilding" className="text-right">
                  Address
                </Label>
                <Input id="landBuilding" required value={address} onChange={(e) => setAddress(e.target.value)} className={addressValid ? '' : 'invalid'}/>
                <Label htmlFor="tenantCode" className="text-right">
                  Tenant Code
                </Label>
                <Input id="propertyCode"/>
              </div> 
            </div>
            <div className="flex flex-col justify-center items-center">
            </div>
          </div>
          <DialogFooter>
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