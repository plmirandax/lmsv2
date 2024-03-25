import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  image: f({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .onUploadComplete(() => {}),
  tenantImage: f({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .onUploadComplete(() => {}),
  propertyImage: f({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .onUploadComplete(() => {}),
  spacesImage: f({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .onUploadComplete(() => {}),
  media: f({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter