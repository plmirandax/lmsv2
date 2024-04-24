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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast"
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import "@uploadthing/react/styles.css";
import { z } from "zod"
import { PlusCircleIcon } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/datepicker"
import { Separator } from "@/components/ui/separator"



interface User {
  id: string
  name: string
  email: string | null
  image: string | null
  role: string
}

interface LeaveType {
  id: string
  name: string
}

const plsSchema = z.object({
  leaveTypeId: z.string(),
  reason: z.string(),
  approverRemarks: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  userId: z.string(),
});

export function SubmitLeave() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState<string>('');
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    leaveTypeId: '',
    reason: '',
    approverRemarks: '',
    startDate: '',
    endDate: '',
    userId: (session?.user as User)?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      leaveTypeId: selectedLeaveTypeId,
    }));
  }, [selectedLeaveTypeId]);

  useEffect(() => {
    fetch('/api/fetch-leave-type') // replace with your API route
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setLeaveTypes(data.leaveTypes))
      .catch(() => toast.error('An error occurred while fetching leave types. Please try again.'));
  }, []);
  const handleChange = (key: keyof typeof formData, value: string | number | Date | undefined) => {
    if (value !== undefined) {
      setFormData(prevState => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    const selectedLeaveType = leaveTypes.find(leaveTypes => leaveTypes.name === value);
    if (selectedLeaveType) {
      setSelectedLeaveTypeId(selectedLeaveType.id);
    }
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    console.log('clicked')
    try {
      const SeshUserId = (session?.user as User)?.id;
      if (!SeshUserId) {
        throw new Error('User ID is not available. Please log in again.');
      }
  
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
  
      const formattedData = {
        ...formData,
        startDate: isNaN(startDate.getTime()) ? formData.startDate : startDate.toISOString(),
        endDate: isNaN(endDate.getTime()) ? formData.endDate : endDate.toISOString(),
      };
  
      try {
        plsSchema.parse(formattedData);
      } catch (error) {
        console.error('Form validation failed:', error);
        toast.error('Form validation failed. Please check your input and try again.');
        return;
      }
  
      const response = await fetch('/api/create-leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as { accessToken: string })?.accessToken}`
        },
        body: JSON.stringify(formattedData)
      });
  
      if (!response.ok) {
        console.error('Network request failed:', response);
        throw new Error(response.statusText);
      }
  
      setFormData({
        leaveTypeId: '',
        reason: '',
        approverRemarks: '',
        startDate: '',
        endDate: '',
        userId: SeshUserId,
      });
      toast.success('Tenant added successfully.');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Tenant could not be added. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> <PlusCircleIcon className="pr-2"/>Sumbit Leave</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full">
        <DialogHeader className="sm:max-w-[400px] flex justify-center">
          <DialogTitle>Leave Details</DialogTitle>
          <DialogDescription>
            Fill all the required fields to create submit new leave.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          
          <div className="flex justify-between mt-2">
  <div className="w-1/2 pr-4">
    <Label htmlFor="name">
      Start Date
    </Label>
    <DatePicker
      value={formData.startDate ? new Date(formData.startDate) : undefined}
      onChange={date => handleChange('startDate', date)}
    />
  </div>
  <div className="w-1/2">
    <Label htmlFor="name">
      End Date
    </Label>
    <DatePicker
      value={formData.endDate ? new Date(formData.endDate) : undefined}
      onChange={date => handleChange('endDate', date)}
    />
  </div>
</div>
<div className="w-1/2">
  <Label htmlFor="propertyCode" className="text-right">
                  Leave Type
                </Label>
                <Select onValueChange={(value: string) => handleSelectChange(value)}>
                  <SelectTrigger id="status" aria-label="Select status">
                  <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                  {leaveTypes.map(leaveTypes => (
                  <SelectItem key={leaveTypes.id} value={leaveTypes.name}>
                  {leaveTypes.name}
                  </SelectItem>
                  ))}
                  </SelectContent>
                  </Select>
  </div>
  <Label>selected Id: <p>{selectedLeaveTypeId}</p></Label>
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
                  Purpose
                </Label>
                <Textarea 
    required 
    value={formData.reason} 
    onChange={(e) => handleChange('reason', e.target.value)} 
    className={`${formErrors.reason ? 'invalid' : ''} flex w-full items-center justify-center`} 
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