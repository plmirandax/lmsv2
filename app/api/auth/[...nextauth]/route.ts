import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { randomBytes } from 'crypto';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
            return null
        }
    
        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true, // Make sure to select the role
                createdAt: true,
                password: true,
            }
        })
    
        const tenant = await prisma.tenant.findUnique({
          where: {
              email: credentials.email
          },
          select: {
              id: true,
              email: true,
              name: true,
              createdAt: true,
              passwordHash: true,
              emailVerified: true, // Make sure to select the emailVerified field
          }
      })
      
      if (tenant && !tenant.emailVerified) {
          throw new Error('Email not verified')
      }
    
        if (!user && !tenant) {
            return null
        }
    
        const isPasswordValid = user
            ? await compare(credentials.password, user.password)
            : tenant && tenant.passwordHash ? await compare(credentials.password, tenant.passwordHash) : false;
    
        if (!isPasswordValid) {
            return null
        }
    
        const accessToken = randomBytes(40).toString('hex');
    
        return user
            ? {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role, // Return the role
                createdAt: user.createdAt,
                accessToken
            }
            : tenant ? {
                id: tenant.id,
                email: tenant.email,
                name: tenant.name,
                createdAt: tenant.createdAt,
                accessToken
            } : null;
    }
    })
  ],
  callbacks: {
    
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role, // Add role to session
          createdAt: token.createdAt,
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          role: u.role, // Add role to JWT token
          createdAt: u.createdAt,
          accessToken: u.accessToken,
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

