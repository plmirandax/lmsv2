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
import { useSession as useNextAuthSession } from 'next-auth/react'
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


interface User {
  id: string
  firstName: string | null
  lastName: string | null
  email: string | null
  image: string | null
  role: string
}

const plsSchema = z.object({
plsType: z.string(),
destination: z.string(),
description: z.string(),
timeIn: z.string().optional(),
timeOut: z.string().optional(),
userId: z.string(),
plsDate: z.date(),
});

export function SubmitPLSForm() {
  const { data: session } = useNextAuthSession();
  const [formData, setFormData] = useState({
   plsType: '',
   description: '',
   destination: '',
    timeIn: '',
    timeOut: '',
    plsDate: new Date(),
   userId: (session?.user as User)?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const SeshUserId = (session?.user as User)?.id;
      if (!SeshUserId) {
        throw new Error('User ID is not available. Please log in again.');
      }
      plsSchema.parse(formData);
      const response = await fetch('/api/create-pls', {
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
        plsType: '',
        description: '',
        destination: '',
         timeIn: '',
         timeOut: '',
          plsDate: new Date(),
        userId: SeshUserId,
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
        <Button variant="outline"> <PlusCircleIcon className="pr-2"/>Submit PLS</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] flex flex-col">
        <form onSubmit={handleSubmit}>
        <DialogHeader className="sm:max-w-[600px] flex flex-col items-center justify-center text-center">
          <DialogTitle>Submit PLS Details</DialogTitle>
          <DialogDescription>
            Fill all the required fields to create new PLS.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Card><CardContent>
          <div className="flex">
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
    <Label htmlFor="name" className="text-right">
      Name
    </Label>
    <Input readOnly disabled value={session?.user.name || ''} />
  </div>
</div>
          <div className="flex">
            <div className="w-1/2 pr-4 mt-2">
                <Label htmlFor="propertyCode" className="text-right">
                  PLS Type
                </Label>
                <Select onValueChange={(value: string) => handleChange('plsType', value)}>
  <SelectTrigger id="space" aria-label="Select PLS Type" className="flex">
    <SelectValue placeholder="Select PLS Type.." />
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
            <div className="w-1/2 mt-2">
                <Label htmlFor="propertyName" className="text-right">
                  Destination
                </Label>
                <Input required 
                type="text"
                value={formData.destination} 
                onChange={(e) => handleChange('destination', e.target.value)} 
                className={formErrors.destination ? 'invalid' : ''} />
            </div>
          </div>
          <div className="flex flex-col w-full mt-2 pr-4">
  <Label htmlFor="email" className="ml-2 mb-1">
    Purpose
  </Label>
  <Textarea 
    required 
    value={formData.description} 
    onChange={(e) => handleChange('description', e.target.value)} 
    className={`${formErrors.description ? 'invalid' : ''} flex flex-col w-full items-center justify-center ml-2`} 
  />
</div>

            <div className="flex">
            <div className="w-1/2 mt-2 pr-4">
              <Label htmlFor="contactNo" className="text-right">
                Time In
              </Label>
              <Input required
              type="date"
              value={formData.timeIn} 
              onChange={(e) => handleChange('timeIn', e.target.value)} 
              className={formErrors.timeIn ? 'invalid' : ''} />
            </div>
            <div className="w-1/2 mt-2">
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
          </CardContent></Card>
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
