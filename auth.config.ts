import type { NextAuthConfig } from "next-auth"
import { UserAuthCredentials } from "@src/domain/interfaces/auth"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("testando...")
      const isLoggedIn = !!auth?.user
      const isLoginPage = nextUrl.pathname.startsWith("/login")
      if (!isLoginPage) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl))
      }
      return true
    }
  },
  providers: []
}
