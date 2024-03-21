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
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { useState } from "react"
import React from "react"
import toast from "react-hot-toast"
import TeamSwitcher from "@/app/(app)/dashboard/components/team-switcher"
import { Search } from "@/app/(app)/dashboard/components/search"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/app/(app)/dashboard/components/user-nav"
import { SystemMenu } from "@/app/(app)/dashboard/components/system-menu"

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Input validation
    if (!email || !password || !name) {
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
          name
        })
      })
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      // Registration successful
      toast.success('Registered Successfully.');
      // Clear input fields
      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      // Registration failed
      toast.error(error.message || 'An error occurred while processing your request');
    }
  }

  return (
    <div className="border-b relative justify-center items-center min-h-screen overflow-hidden rounded">
          <div className="w-full h-auto md:h-16">
              <div className="flex h-16 items-center px-4">
                    <div className="hidden sm:block">
                     <TeamSwitcher />
                    </div>
                      <SystemMenu />
                 <div className="ml-auto flex items-center space-x-2">
                     <Search />
                     <ModeToggle />
                     <UserNav />
                 </div>
               </div>
            </div>
            <div className="w-full m-auto bg-white lg:max-w-lg rounded mt-48">
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" 
              required
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email"
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
               type="password"
               autoComplete="current-passowrd"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <span className=" text-blue-600 hover:underline text-sm">
              Forget password ?
            </span>
             </CardContent>
           <CardFooter className="flex flex-col">
             <Button className="w-full" onClick={onSubmit}>Sign Up</Button>
           </CardFooter>
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 m-2">
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline">
              <Icons.twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div>
          <p className="mt-2 text-xs text-center text-gray-700 mb-2">
            {" "}
            Already have an account?<Link className="text-indigo-500 hover:underline" href="/login"/>{" "}
            <span className=" text-blue-600 hover:underline">Sign In</span>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default SignUpForm