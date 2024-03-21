export { default } from 'next-auth/middleware'

export const config = { matcher: [
  '/dashboard',
  '/api/auth/signin',
  '/properties',
  '/billing',
  '/tenants',
  '/taskmanager',
  '/profiles',
  '/users',
  '/settings',
  '/api/auth/signout',
  '/api/auth/callback',
  '/api',
  '/reports',
  '/docs',
]}