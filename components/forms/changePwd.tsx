'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useState } from "react"
import { resetPassword } from "@/app/(app)/actions/users/resetPassword"
import { changePassword } from "@/app/(app)/actions/users/changePassword"

interface ChangePwdModalProps {
  resetPasswordToken: string

}

const ChangePwdModal = ({resetPasswordToken}: ChangePwdModalProps) => {

const [password, setPassword] = useState<string>('')
const [confirmPassword, setConfirmPassword] = useState<string>('')

const [message, setMessage] = useState<string>('')

const handleSubmit = async () => {
  if(password !== confirmPassword) {
    setMessage('Passwords do not match');
    return;
  }

  const message = await changePassword(resetPasswordToken, password);

  setMessage(message);

}
    

  return (
    <Card>
      <CardContent className="sm:max-w-[425px]">

          <CardHeader className="space-y-1 rounded">
            <CardTitle className="text-2xl text-center rounded">Reset Password</CardTitle>
            <CardDescription className="text-center rounded">
              {/*//Enter your email and password to login */}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 rounded">
            <div className="grid gap-2 rounded">
              <Label htmlFor="email">Password</Label>
              <Input 
              id="pasword" 
              type="password"
               placeholder=""
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
              <Input 
              id="pasword2" 
              type="password"
               placeholder=""
               required
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePwdModal