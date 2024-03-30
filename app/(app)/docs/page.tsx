'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useEffect, useState } from "react"

interface Spaces{ 
  id: string
  spaceName: string
}

const Documentation = () => {

  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('');
  const [spaces, setSpaces] = useState<Spaces[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchspaces', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Send any necessary data in the request body
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch property data');
        }
  
        const responseData = await response.json();
        setSpaces(responseData.spaces); // Set only the properties field to state
  
        // Log the properties data to the console
        console.log(responseData.spaces);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    }
  
    fetchData();
  }, []);// This useEffect will run only once after the initial render

  const handleSelectChange = (value: string) => {
    const selectedSpace = spaces.find(space => space.spaceName === value);
    if (selectedSpace) {
      setSelectedSpaceId(selectedSpace.id);
    }
  };

  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value: string) => handleSelectChange(value)}>
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {spaces.map(space => (
                  <SelectItem key={space.id} value={space.spaceName}>
                    {space.spaceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Space ID: {selectedSpaceId}</Label>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Documentation