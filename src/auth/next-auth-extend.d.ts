import type { RoleArray } from '@/lib/casl'
import type { DefaultSession, User as DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {
    accessToken: string
    refreshToken: string
    roles: RoleArray
  }

  export interface Session extends DefaultSession {
    user: User
  }
}
