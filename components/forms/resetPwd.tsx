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
import { LockClosedIcon, ReloadIcon } from "@radix-ui/react-icons"
import toast from "react-hot-toast"

const ResetPwdModal = () => {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsLoading(true) // Start loading animation
    const message = await resetPassword(email);
    const toastId = toast.success('Password reset link sent to your email.')

    setTimeout(() => {
      toast.dismiss(toastId);
      setIsLoading(false); // Stop loading animation
    }, 2000); // 3000 milliseconds = 3 seconds

    setMessage(message);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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
              <Button className="w-full" onClick={handleSubmit} >
                {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <LockClosedIcon className="mr-2 h-4 w-4" />}
                {isLoading ? 'Sending reset link.' : 'Reset Password'}
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </DialogTrigger>
    </Dialog>
  )
}

export default ResetPwdModal