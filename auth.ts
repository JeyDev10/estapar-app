import NextAuth, { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { JWT } from "next-auth/jwt"

import { LoginForm } from "@src/domain/interfaces/auth"
declare module "next-auth" {
  interface Session {
    token: string
  }
  interface User {
    token: string
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    token: string
  }
}

async function authenticate(username: string, password: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Authenticate`, {
      body: JSON.stringify({ username, password }),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
      console.error(`API response failed with status: ${res.status}`)
      return undefined
    }
    const authentication = await res.json()
    return authentication
  } catch (error) {
    console.error("Failed to authenticate:", error)
    return undefined
  }
}

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials as LoginForm
        const userAuth = await authenticate(username, password)
        if (!userAuth) {
          console.error("Invalid credentials")
          return null
        }

        return {
          email: username,
          name: username,
          token: userAuth.data.token
        } as User
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.token = token.token
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isLoginPage = nextUrl.pathname.startsWith("/login")
      if (!isLoginPage) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/"))
      }
      return true
    }
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions)
