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
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSession, useSession as useNextAuthSession, useSession } from 'next-auth/react'
import React, { useState } from 'react';
import toast from "react-hot-toast"
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import "@uploadthing/react/styles.css";
import { z } from "zod"
import { PlusCircleIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import { PLSType } from "@prisma/client"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/datepicker"
import { Separator } from "@/components/ui/separator"


interface User {
  id: string
  name: string
  email: string | null
  image: string | null
  role: string
  approverId: string
}

const plsSchema = z.object({
plsType: z.string(),
destination: z.string(),
description: z.string(),
timeIn: z.string().optional(),
timeOut: z.string().optional(),
userId: z.string(),
plsDate: z.date(),
approverId: z.string(),
});

export function SubmitPLSForm() {

  const { data: session } = useSession();
  const [formData, setFormData] = useState({
   plsType: '',
   description: '',
   destination: '',
    timeIn: '',
    timeOut: '',
    plsDate: new Date(),
    approverId: (session?.user as User)?.approverId || '',
   userId: (session?.user as User)?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

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
      const SeshUserId = (session?.user as User)?.id;
      if (!SeshUserId) {
        throw new Error('User ID is not available. Please log in again.');
      }
  
     // Validate the form data with plsSchema before converting plsDate to a string
     plsSchema.parse(formData);

     // Adjust the date to UTC before converting to string
     const utcDate = new Date(
       Date.UTC(
         formData.plsDate.getFullYear(),
         formData.plsDate.getMonth(),
         formData.plsDate.getDate()
       )
     );
 
     const formattedData = {
       ...formData,
       plsDate: utcDate.toISOString(),
     };
  
      const response = await fetch('/api/create-pls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as { accessToken: string })?.accessToken}`
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setFormData({
        plsType: '',
        description: '',
        destination: '',
         timeIn: '',
         timeOut: '',
          plsDate: new Date(),
          approverId: (session?.user as User)?.approverId || '',
        userId: SeshUserId,
      });
      toast.success('PLS has been submitted successfully.');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Failed to create new PLS. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> <PlusCircleIcon className="pr-2"/>Submit PLS</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full">
        <DialogHeader className="sm:max-w-[400px] flex justify-center">
          <DialogTitle>Personnel Locator Slip (PLS)</DialogTitle>
          <DialogDescription>
            Fill all the required fields to create new PLS.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          
          <div className="flex justify-between mt-2">
  <div className="w-1/2 pr-4">
    <Label htmlFor="name">
      PLS Date
    </Label>
    <DatePicker
      value={formData.plsDate ? new Date(formData.plsDate) : undefined}
      onChange={date => handleChange('plsDate', date)}
    />
  </div>
  <div className="w-1/2">
  <Label htmlFor="propertyCode" className="text-right">
                  PLS Type
                </Label>
                <Select onValueChange={(value: string) => handleChange('plsType', value)}>
  <SelectTrigger id="space" aria-label="Select type">
    <SelectValue placeholder="Select type.." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value={PLSType.Official}>
      Official
    </SelectItem>
    <SelectItem value={PLSType.Personal}>
      Personal
    </SelectItem>
  </SelectContent>
</Select>
  </div>
</div>
<div className="flex justify-between">
            <div className="w-1/2 pr-4">
              <Label htmlFor="contactNo" className="text-right">
                Time In
              </Label>
              <Input required
              type="date"
              value={formData.timeIn} 
              onChange={(e) => handleChange('timeIn', e.target.value)} 
              className={formErrors.timeIn ? 'invalid' : ''} />
            </div>
            <div className="w-1/2">
              <Label htmlFor="monthlyRent" className="text-right">
                Time Out
              </Label>
              <Input required
              type="date"
              value={formData.timeOut} 
              onChange={(e) => handleChange('timeOut', e.target.value)} 
              className={formErrors.timeOut ? 'invalid' : ''} />
            </div>
          </div>
<div className="flex justify-center">
            <div className="w-full">
            <Label htmlFor="name" className="text-right">
      Name
    </Label>
    <Input readOnly disabled value={session?.user.name || ''} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
                <Label htmlFor="propertyName" className="text-right flex">
                  Destination
                </Label>
                <Input required 
                type="text"
                value={formData.destination} 
                onChange={(e) => handleChange('destination', e.target.value)} 
                className={formErrors.destination ? 'invalid' : ''} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
                <Label htmlFor="propertyName" className="text-right flex">
                  Purpose
                </Label>
                <Textarea 
    required 
    value={formData.description} 
    onChange={(e) => handleChange('description', e.target.value)} 
    className={`${formErrors.description ? 'invalid' : ''} flex w-full items-center justify-center`} 
  />
            </div>
          </div>
  
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