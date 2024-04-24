"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import React from "react"
import toast from "react-hot-toast"

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [address, setAddress] = useState('')
  const [empId, setEmpId] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Input validation
    if (!email || !password || !firstName) {
      toast.error('All fields are required.');
      return;
    }
  
    // Email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
  
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          contactNo,
          address,
          empId
        })
      })
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      // Registration successful
      toast.success('Registered Successfully.');
      setIsLoading(true)
      // Clear input fields
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setContactNo('');
      setAddress('');
      setEmpId('');
    } catch (error: any) {
      // Registration failed
      toast.error(error.message || 'An error occurred while processing your request');
      setIsLoading(false)
    }
  }

  return (
    <div className="border-b relative justify-center items-center min-h-screen overflow-hidden rounded">
          <div className="w-full h-auto md:h-16">
            </div>
            <div className="w-full m-auto bg-white lg:max-w-lg rounded">
            <Card className="rounded">
            <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
            </CardHeader>
           <CardContent className="grid gap-4">
           <div className="grid gap-2">
              <Label htmlFor="empId">Employee ID</Label>
              <Input id="empId" type="text" 
              disabled={isLoading}
              required
              placeholder=""
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" 
              disabled={isLoading}
              required
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" 
              disabled={isLoading}
              required
              placeholder=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email"
                 disabled={isLoading}
                 type="email"
                 required
                 placeholder=""
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password"
               disabled={isLoading} 
               type="password"
               autoComplete="current-passowrd"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactNo">Contact No.</Label>
              <Input id="contactNo" type="text"
              disabled={isLoading} 
              required
              placeholder=""
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Complete Address</Label>
              <Input id="address" type="text"
              disabled={isLoading} 
              required
              placeholder=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <span className=" text-blue-600 hover:underline text-sm">
              Forget password ?
            </span>
             </CardContent>
           <CardFooter className="flex flex-col">
             <Button className="w-full" 
             disabled={isLoading} 
             onClick={onSubmit}>Sign Up</Button>
           </CardFooter>

           <p className="mt-2 text-xs text-center mb-8">
  Already have an account? {""}{""}
  <Link className="text-indigo-500 hover:underline ml-2" href="/">
    Sign In
  </Link>
</p>
        </Card>
      </div>
    </div>
  )
}

export default SignUpForm