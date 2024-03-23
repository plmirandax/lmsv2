import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function ActiveTenants() {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/assets/usericon.png" alt="Avatar" />
            <AvatarFallback>FM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Fitmart</p>
            <p className="text-sm text-muted-foreground">
              fitmart@gmail.com
            </p>
          </div>
          <div className="ml-auto font-medium"></div>
        </div>
        <div className="flex items-center">
          <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
            <AvatarImage src="/assets/usericon.png" alt="Avatar" />
            <AvatarFallback>AQ</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Aquinas</p>
            <p className="text-sm text-muted-foreground">aquinas@gmail.com</p>
          </div>
          <div className="ml-auto font-medium"></div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/assets/usericon.png" alt="Avatar" />
            <AvatarFallback>JB</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Jollibee RD Plaza</p>
            <p className="text-sm text-muted-foreground">
              jollibee@gmail.com
            </p>
          </div>
          <div className="ml-auto font-medium"></div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/assets/usericon.png" alt="Avatar" />
            <AvatarFallback>EL</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">7-11 Daproza</p>
            <p className="text-sm text-muted-foreground">711daproza@gmail.com</p>
          </div>
          <div className="ml-auto font-medium"></div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/assets/usericon.png" alt="Avatar" />
            <AvatarFallback>IF</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Infinitus</p>
            <p className="text-sm text-muted-foreground">infinitus@gmail.com</p>
          </div>
          <div className="ml-auto font-medium"></div>
        </div>
      </div>
    )
  }