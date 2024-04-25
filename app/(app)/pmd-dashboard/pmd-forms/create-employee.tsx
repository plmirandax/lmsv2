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
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast"
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import "@uploadthing/react/styles.css";
import { z } from "zod"
import { PlusCircleIcon } from "lucide-react"

import { PLSType, Role } from "@prisma/client"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/datepicker"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"


interface User {
  id: string
  name: string
  email: string | null
  image: string | null
  role: string
}

interface Department {
    id: string
    name: string
}

const employeeSchema = z.object({
    empId: z.string(),
    name: z.string(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    email: z.string(),
    password: z.string(),
    role: z.string(),
    image: z.string().optional(),
    deptId: z.string(),
    approverId: z.string(),
    createdBy: z.string(),
});

export function CreateEmployee() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [approvers, setApprovers] = useState<Department[]>([]);
  const [selectedApproverId, setSelectedApproverId] = useState<string>('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('');
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    contactNo: '',
    address: '',
    email: '',
    password: '',
    role: '',
    image: '',
    deptId: '',
    approverId: '',
   createdBy: (session?.user as User)?.id || '',
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

    useEffect(() => {
        setFormData(prevState => ({
        ...prevState,
        deptId: selectedDepartmentId,
        }));
    }, [selectedDepartmentId]);

    useEffect(() => {
        setFormData(prevState => ({
        ...prevState,
        approverId: selectedApproverId,
        }));
    }, [selectedApproverId]);

    useEffect(() => {
        fetch('/api/fetch-users') // replace with your API route
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => setApprovers(data.users))
          .catch(() => toast.error('An error occurred while fetching users. Please try again.'));
      }, []);

    useEffect(() => {
        fetch('/api/fetch-department') // replace with your API route
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => setDepartments(data.departments))
          .catch(() => toast.error('An error occurred while fetching departments. Please try again.'));
      }, []);

  const handleSelectChangeDepartment = (value: string) => {
        const selectedDepartment = departments.find(departments => departments.name === value);
        if (selectedDepartment) {
          setSelectedDepartmentId(selectedDepartment.id);
        }
      };

    const handleSelectChangeApprover = (value: string) => {
            const selectedApprover = approvers.find(approvers => approvers.name === value);
            if (selectedApprover) {
            setSelectedApproverId(selectedApprover.id);
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
     employeeSchema.parse(formData);
  
      const response = await fetch('/api/create-employee', {
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
        empId: '',
        name: '',
        contactNo: '',
        address: '',
        email: '',
        password: '',
        role: '',
        image: '',
        deptId: '',
        approverId: '',
       createdBy: SeshUserId,
      });
      toast.success('Employee has been created successfully.');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Failed to create new Employee. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> <PlusCircleIcon className="pr-2"/>Create Employee</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full">
        <DialogHeader className="sm:max-w-[400px] flex justify-center">
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>
            Fill all the required fields to create new employee.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          
          <div className="flex justify-between mt-2">
  <div className="w-[100px] pr-4">
  <Label htmlFor="empId" className="text-right">
      Emp. ID
    </Label>
    <Input required 
                type="text"
                value={formData.empId} 
                onChange={(e) => handleChange('empId', e.target.value)} 
                className={formErrors.empId ? 'invalid' : ''} />
  </div>
  <div className="w-[300px]">
  <Label htmlFor="name" className="text-right">
      Employee Full Name
    </Label>
    <Input required 
                type="text"
                value={formData.name} 
                onChange={(e) => handleChange('name', e.target.value)} 
                className={formErrors.name ? 'invalid' : ''} />
  </div>
</div>
<div className="flex justify-between">
  <div className="w-[170px] pr-4">
  <Label htmlFor="contactNo" className="text-right">
      Contact No.
    </Label>
    <Input required 
                type="text"
                value={formData.contactNo} 
                onChange={(e) => handleChange('contactNo', e.target.value)} 
                className={formErrors.contactNo ? 'invalid' : ''} />
  </div>
  <div className="w-250">
  <Label htmlFor="address" className="text-right">
      Complete Address
    </Label>
    <Input required 
                type="text"
                value={formData.address} 
                onChange={(e) => handleChange('address', e.target.value)} 
                className={formErrors.address ? 'invalid' : ''} />
  </div>
</div>
<div className="flex justify-center">
            <div className="w-full">
            <Label htmlFor="email" className="text-right">
      Email
    </Label>
    <Input required 
                type="text"
                value={formData.email} 
                onChange={(e) => handleChange('email', e.target.value)} 
                className={formErrors.email ? 'invalid' : ''} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
                <Label htmlFor="password" className="text-right flex">
                  Password
                </Label>
                <Input required 
                type="password"
                value={formData.password} 
                onChange={(e) => handleChange('password', e.target.value)} 
                className={formErrors.password ? 'invalid' : ''} />
            </div>
          </div>


  <div className="w-full">
  <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select onValueChange={(value: string) => handleSelectChangeDepartment(value)} disabled={isLoading}>
                  <SelectTrigger id="department" aria-label="Select dept..">
                  <SelectValue placeholder="Select dept.." />
                  </SelectTrigger>
                  <SelectContent>
                  {departments.map(departments => (
                  <SelectItem key={departments.id} value={departments.name}>
                  {departments.name}
                  </SelectItem>
                  ))}
                  </SelectContent>
                  </Select>
  </div>
  <div className="w-full">
  <Label htmlFor="propertyCode" className="text-right">
                  Role
                </Label>
                <Select onValueChange={(value: string) => handleChange('role', value)}>
  <SelectTrigger id="role" aria-label="Select role">
    <SelectValue placeholder="Select role.." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value={Role.Staff}>
      Staff
    </SelectItem>
    <SelectItem value={Role.Approver}>
      Approver
    </SelectItem>
    <SelectItem value={Role.PMD}>
      PMD
    </SelectItem>
  </SelectContent>
</Select>
  </div>

  <div className="w-full">
  <Label htmlFor="approver" className="text-right">
                  Approver
                </Label>
                <Select onValueChange={(value: string) => handleSelectChangeApprover(value)} disabled={isLoading}>
                  <SelectTrigger id="approver" aria-label="Select approver..">
                  <SelectValue placeholder="Select approver.." />
                  </SelectTrigger>
                  <SelectContent>
                  {approvers.map(approvers => (
                  <SelectItem key={approvers.id} value={approvers.name}>
                  {approvers.name}
                  </SelectItem>
                  ))}
                  </SelectContent>
                  </Select>
  </div>
          </div>
          <DialogFooter className="mt-8">
              <div className="flex justify-center w-full">
              <Button className="w-full" type="submit">
                {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircledIcon className="mr-2 h-4 w-4" />}
                {isLoading ? 'Adding employee..' : 'Submit'}
              </Button>
              </div>
          </DialogFooter>
        </form>
  </DialogContent>
    </Dialog>
    )
  }