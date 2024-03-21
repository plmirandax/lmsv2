import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name: string | null
      email: string | null
      image: string | null
      role: string // Add the role property
    }
  }

  interface JWT {
    role: string // Add the role property
  }
}