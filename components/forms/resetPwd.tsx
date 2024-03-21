'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useState } from "react"
import { resetPassword } from "@/app/(app)/actions/users/resetPassword"

const ResetPwdModal = () => {

const [email, setEmail] = useState('')
const [message, setMessage] = useState('')

const handleSubmit = async () => {
  const message = await resetPassword(email);

  setMessage(message);
}
    

  return (
    <Card className="flex flex-col justify-center items-center">
      <CardContent className="sm:max-w-[425px]">

          <CardHeader className="space-y-1 rounded">
            <CardTitle className="text-2xl text-center rounded">Reset Password</CardTitle>
            <CardDescription className="text-center rounded">
              {/*//Enter your email and password to login */}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 rounded">
            <div className="grid gap-2 rounded">
              <Label htmlFor="email">Email</Label>
              <Input 
              id="email" 
              type="email"
               placeholder=""
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleSubmit}>Reset Password</Button>
          </CardFooter>
      </CardContent>
    </Card>
  )
}

export default ResetPwdModal