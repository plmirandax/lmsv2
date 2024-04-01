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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation"
import GoogleIcon from "@/components/ui/GoogleIcon"
import { EnvelopeClosedIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { EnvelopeIcon } from "@heroicons/react/24/solid"



export default function LoginAccount() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Email is required.')
      return
    }

    if (!isEmailValid(email)) {
      toast.error('Please enter a valid email.')
      return
    }

    if (!password.trim()) {
      toast.error('Password is required.')
      return
    }

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (!res?.error) {
        toast.success('Sign in successful. Redirecting to dashboard...')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        toast.error('Invalid email or password. Please try again.')
      }
    } catch (error: any) {
      console.error("Sign-in error:", error)
      toast.error('An error occurred during sign-in. Please try again.')
    }
  }
  

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden rounded">
      <div className="w-full m-auto bg-white lg:max-w-lg rounded">
        <Card className="rounded">
          <CardHeader>
            <CardTitle className="text-2xl text-center rounded">Sign in</CardTitle>
            <CardDescription className="text-center rounded">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              Login
              <Input 
              id="email" 
              type="email"
               placeholder="Email"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
              id="password"
              placeholder="Password"
               type="password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div className="flex items-center space-x-2">
            <p className="text-sm text-center text-gray-700 mb-2">
                <Link href="/reset-password" className="text-blue-500 hover:underline">
                    Forgot your password?
                 </Link>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={onSubmit}>Login with Email<EnvelopeClosedIcon className="ml-2"/></Button>
          </CardFooter>
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center rounded">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase rounded">
              <span className="bg-background px-2 text-muted-foreground">
                Dont have an account?
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 m-5 rounded">
          <Button onClick={() => signIn('google', { 
            callbackUrl: `${window.location.origin}/dashboard` })} 
            variant="outline" className="w-full py-2 px-4 text-sm">
              <GoogleIcon className="mr-2 h-6 w-6" />
            Sign-in with Google
            </Button>
          </div>

          {/*<p className="mt-2 text-xs text-center text-gray-700 mb-2">
            {" "}
            Dont have an account? <Link className="text-indigo-500 hover:underline" href="/register" />{" "}
            <span className=" text-blue-600 hover:underline">Sign up</span>
          </p> */}
        </Card>
      </div>
    </div>
  )
}