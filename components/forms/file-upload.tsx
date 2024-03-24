import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { UploadButton, UploadDropzone } from '@/lib/uploadthing'

type Props = {
  apiEndpoint: 'image' | 'tenantImage' | 'propertyImage' | 'spacesImage'
  onChange: (url?: string) => void
  value?: string
  className?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const type = value?.split('.').pop()

  if (value) {
    return (
      <div className="flex flex-col items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40 items-center">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon className='h-4 w-4' />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline w-40"
            >
              View PDF
            </a>
          </div>
        )}
        <Button
          onClick={() => onChange('')}
          variant="secondary"
          type="button"
        >
          <X className="h-4 w-4" />
          Remove file.
        </Button>
      </div>
    )
  }
  return (
    <div className="w-full bg-muted/30 items-center">
      <UploadDropzone
     appearance={{
      button:
        "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-blue-500 bg-none after:bg-blue-400",
      container: "w-full h-45 flex rounded-md border-cyan-300 bg-slate-800",
      allowedContent:
        "flex h-0.5 flex-col items-center justify-center px-2 text-white",
    }}
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
          console.log(error)
        }}
      />
    </div>
  )
}

export default FileUpload
