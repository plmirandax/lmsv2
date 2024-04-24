'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useState } from "react"
import { changePassword } from "@/app/(app)/actions/users/changePassword"
import toast from "react-hot-toast"
import { LockOpen1Icon, ReloadIcon } from "@radix-ui/react-icons"

interface ChangePwdModalProps {
  resetPasswordToken: string
}

const ChangePwdModal = ({resetPasswordToken}: ChangePwdModalProps) => {

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    if(password !== confirmPassword) {
      toast.error('Passwords do not match');
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true); // Start loading animation
    const message = await changePassword(resetPasswordToken, password);
    const toastId = toast.success('Password reset successful.')

    setTimeout(() => {
      toast.dismiss(toastId);
      setIsLoading(false); // Stop loading animation
    }, 2000); // 3000 milliseconds = 3 seconds
    

    setMessage(message);
  }

  return (
        <Card className="flex flex-col justify-center items-center h-[350px]">
          <CardContent className="sm:max-w-[425px]">
            <CardHeader className="space-y-1 rounded">
              <CardTitle className="text-2xl text-center rounded">Reset Password</CardTitle>
              <CardDescription className="text-center rounded">
                {/*//Enter your email and password to login */}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 rounded">
              <div className="grid gap-2 rounded">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder=""
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  placeholder=""
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" onClick={handleSubmit} >
                {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <LockOpen1Icon className="mr-2 h-4 w-4" />}
                {isLoading ? 'Resetting password.' : 'Change Password'}
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
  )
}

export default ChangePwdModal