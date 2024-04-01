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
      <div className="flex">
        {type !== 'pdf' ? (
          <div className="relative w-auto h-auto items-center">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              width={400}
              height={400}
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md">
            <FileIcon className='h-4 w-4' />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm"
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
          <X className="flex flex-col h-4 w-4" />
          Remove file.
        </Button>
      </div>
    )
  }
  return (
    <div className="w-full items-center">
      <UploadButton
     appearance={{
      button:
        "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-blue-500 bg-none after:bg-blue-400 mb-2",
      container: "w-full h-15",
      allowedContent:
        "flex h-1.5 flex-col justify-center px-2 text-white",
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
