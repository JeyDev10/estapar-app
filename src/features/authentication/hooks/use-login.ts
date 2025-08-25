"use client"

import { signIn } from "@/auth"
import { LoginForm } from "@/src/domain/interfaces/auth"
import { authenticate } from "@/src/lib/actions/authenticate"

export function useLogin() {
  function handleLogIn(loginForm: LoginForm) {
    authenticate(loginForm)
  }

  return {
    handleLogIn
  }
}
