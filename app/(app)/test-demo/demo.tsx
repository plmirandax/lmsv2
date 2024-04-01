import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRightIcon,
  Building2,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Currency,
  DollarSign,
  File,
  Home,
  LandPlot,
  Landmark,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { SelectScrollable } from "./select"
import { Label } from "@/components/ui/label"
import GMaps from "./gmaps/gmaps"
import GoogleMaps from "./gmaps/gmaps"
import { Overview } from "../dashboard/components/overview"


export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <SelectScrollable />
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Separator className="flex flex-col justify-center items-center pl-[-10px]"/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex">Total Area <LandPlot className="w-4 h-4 ml-3 mt-0.5"/></CardDescription>
                  <CardTitle className="text-4xl">132,923</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last year
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex">No. of Properties <Building2 className="w-4 h-4 ml-3 mt-0.5" /></CardDescription>
                  <CardTitle className="text-4xl">1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex">Property Revenue <DollarSign className="w-4 h-4 ml-3 mt-0.5" /></CardDescription>
                  <CardTitle className="text-4xl">1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total No. of Encumbrance</CardDescription>
                  <CardTitle className="text-3xl">5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last year
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Property Details</TabsTrigger>
                  <TabsTrigger value="month">Notifications</TabsTrigger>
                  <TabsTrigger value="year">Audit Logs</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Available
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Under Renovation
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Not Available
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                  <Button
                  size='sm'
                  variant='outline'
                  className="h-7 gap-1 text-sm"
                  > <ArrowUpRightIcon className="h-3.5 w-3.5" />View All</Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Properties</CardTitle>
                    <CardDescription>
                      Total property records for this company.
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property Name</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Custodian
                          </TableHead>
                          <TableHead className="text-right">Total Area</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-accent">
                          <TableCell>
                            <div className="font-medium">Property #1</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              General Santos City
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Commercial Space
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Available
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Custodian #1
                          </TableCell>
                          <TableCell className="text-right">250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Property #2</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              Cebu City
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Commercial Space
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Under Renovation
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Custodian #2
                          </TableCell>
                          <TableCell className="text-right">150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Property #3</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              Quezon City
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Commercial Space
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Under Renovation
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Custodian #3
                          </TableCell>
                          <TableCell className="text-right">250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Property #4</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              General Santos City
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Commercial Space
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Available
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Custodian #4
                          </TableCell>
                          <TableCell className="text-right">350.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Property #5</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              Koronadal City
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Commercial Space
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Available
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Custodian #5
                          </TableCell>
                          <TableCell className="text-right">450.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Property #6</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              General Santos City
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Commercial Space
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Available
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Custodian #6
                          </TableCell>
                          <TableCell className="text-right">250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Property #7</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              General Santos City
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Commercial Space
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Under Renovation
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Custodian #7
                          </TableCell>
                          <TableCell className="text-right">150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Property #8</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              General Santos City
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Commercial Space
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Available
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Custodian #8
                          </TableCell>
                          <TableCell className="text-right">450.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Encumbrance Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
          </div>
          <div>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Property #1
                  </CardTitle>
                  <CardDescription>Juan J. Dela Cruz</CardDescription>
                  <CardDescription>RD Realty Development Corporation</CardDescription>
                  <CardDescription>juan@gmail.com</CardDescription>
                  <CardDescription>(083) 553 - 8330</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Property Address</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        General Santos Business Park
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        General Santos City 
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Total Area
                      </span>
                      <span>250 sqm</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                  <div className="font-semibold">RPT Details</div>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">PD No.</span>
                      <span>412-412-3</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Lot No.</span>
                      <span>231</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>25.00</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>329.00</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Custodian Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>Jose Rizal</span>
                      <span>Property Custodian</span>
                      <span>RD Realty Development Corporation</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Contact Information</div>
                    <div className="text-muted-foreground">
                      joserizal@gmail.com
                    </div>
                    <div className="text-muted-foreground">
                      083 553 8330 / +639123945678
                    </div>
                  </div>
                  
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated <time dateTime="2023-11-23">April 1, 2024</time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
            <Card className="mt-7"><CardContent className="mt-2">
              <Label className="mt-4">Google Maps</Label>
              <div className="mt-4">
              <GoogleMaps />
              </div>
              </CardContent></Card>
          </div>
        </main>
      </div>

    </div>
  )
}
