'use client'
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useSession as useNextAuthSession } from 'next-auth/react';
import "@uploadthing/react/styles.css";
import { z } from 'zod';
import FileUpload from "./file-upload";
import { SelectGroup } from "../ui/select";
import { PlusCircleIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent } from "../ui/card";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
}

interface Module {
  id: string;
  moduleTitle: string;
}

const questionSchema = z.object({
    image: z.string(),
    question: z.string(),
    Answer1: z.string(),
    Answer2: z.string(),
    Answer3: z.string(),
    moduleId: z.string(),
    CorrectAnswers: z.string(),
});

export function AddNewQuestions() {
  const { data: session } = useNextAuthSession();
  const userId = (session?.user as User)?.id
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [modules, setModules] = useState<Module[]>([]);
  const [formData, setFormData] = useState({
    image: '',
    question: '',
    Answer1: '',
    Answer2: '',
    Answer3: '',
    CorrectAnswers: '',
    moduleId: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/dropbox-modules') // replace with your API route
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setModules(data.modules))
      .catch(error => console.error('Failed to fetch tenants:', error));
  }, []);

  useEffect(() => {
    console.log("Selected Module ID Updated:", selectedModuleId);
    // Update tenantId in formData when selectedTenantId changes
    setFormData(prevState => ({
      ...prevState,
      moduleId: selectedModuleId,
    }));
  }, [selectedModuleId]);


  const handleChange = (key: keyof typeof formData, value: string | number | Date | undefined) => {
    if (value !== undefined) {
      setFormData(prevState => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value); // Update the selected status
    setFormData(prevState => ({
      ...prevState,
    }));
  };

  const handleSelectChange = (value: string) => {
    const selectedModule = modules.find(modules => modules.moduleTitle === value);
    if (selectedModule) {
      setSelectedModuleId(selectedModule.id);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const userId = (session?.user as User)?.id;
      if (!userId) {
        throw new Error('User ID is not available. Please log in again.');
      }
      questionSchema.parse(formData);
      const response = await fetch('/api/create-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as { accessToken: string })?.accessToken}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setFormData({
        image: '',
        question: '',
        Answer1: '',
        Answer2: '',
        Answer3: '',
        CorrectAnswers: '',
        moduleId: '',
      });
      toast.success('Questions added successfully.');
    } catch (error) {
      const err = error as Error;
      console.error(err);
      toast.error(err.message || 'Space could not be added. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent"> <PlusCircleIcon className="pr-2" />Create New Questions</Button>
        </DialogTrigger>
        <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Questions</DialogTitle>
            <DialogDescription>
              Fill all the required fields to create new questions.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
              <Card>
                <CardContent>
                  <div className="flex mt-6">
                    <div className="w-1/2 pr-4">
                      <Label htmlFor="spaceCode" className="text-right">
                            Questions
                      </Label>
                      <Input id="spaceCode" required value={formData.question} onChange={(e) => handleChange('question', e.target.value)} className={formErrors.question ? 'invalid' : ''}/>
                    </div>
                  <div className="w-1/2 pl-4">
                      <Label htmlFor="Answer1" className="text-right">
                            Answer 1
                        </Label>
                        <Input id="Answer1" required value={formData.Answer1} onChange={(e) => handleChange('Answer1', e.target.value)} className={formErrors.Answer1 ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                      <Label htmlFor="Answer2" className="text-right">
                            Answer 2
                        </Label>
                        <Input id="Answer2" required value={formData.Answer2} onChange={(e) => handleChange('Answer2', e.target.value)} className={formErrors.Answer2 ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                      <Label htmlFor="Answer3" className="text-right">
                            Answer 3
                        </Label>
                        <Input id="Answer3" required value={formData.Answer3} onChange={(e) => handleChange('Answer3', e.target.value)} className={formErrors.Answer3 ? 'invalid' : ''}/>
                  </div>
                  <div className="w-1/2 pl-4">
                      <Label htmlFor="correcntAnswers" className="text-right">
                            Correct Answer
                        </Label>
                        <Input id="correctAnswers" required value={formData.CorrectAnswers} onChange={(e) => handleChange('CorrectAnswers', e.target.value)} className={formErrors.CorrectAnswers ? 'invalid' : ''}/>
                  </div>
                  </div>
                  <div className="flex">
                  <div className="w-1/2 mt-2 pl-4">
                  <Label>Select Module</Label>
                  <Select onValueChange={(value: string) => handleSelectChange(value)}>
                  <SelectTrigger id="status" aria-label="Select module">
                  <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                  {modules.map(modules => (
                  <SelectItem key={modules.id} value={modules.moduleTitle}>
                  {modules.moduleTitle}
                  </SelectItem>
                  ))}
                  </SelectContent>
                  </Select>
              </div>
              <div className="w-1/2 mt-2 pl-4">
                  <Label>Select Correct Answer</Label>
                  <Select onValueChange={(value: string) => handleSelectChange(value)}>
                  <SelectTrigger id="status" aria-label="Select module">
                  <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                  {modules.map(modules => (
                  <SelectItem key={modules.id} value={modules.moduleTitle}>
                  {modules.moduleTitle}
                  </SelectItem>
                  ))}
                  </SelectContent>
                  </Select>
              </div>

              </div>
              </CardContent>
              </Card>
            </div>
            
            <Card className="item-center justify-center flex flex-col">
              <CardContent>
                <Label className="flex flex-col item-center pt-2">Questions Image</Label>
          <FileUpload 
                apiEndpoint="spacesImage"
                value={formData.image} 
                onChange={(url) => url && handleChange('image', url)}
                className={`${formErrors.image ? 'invalid' : ''} items-right pt-2`}
              />
              </CardContent>
              </Card>
          <DialogFooter>
                <div className="flex justify-center w-full">
                <Button className="w-full" onClick={handleSubmit}>
          {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircledIcon className="mr-2 h-4 w-4" />}
          {isLoading ? 'Adding space...' : 'Submit'}
        </Button>
                </div>
        </DialogFooter>
    </DialogContent>
    </form>
      </Dialog>
    )
  }