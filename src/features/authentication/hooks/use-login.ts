"use client"
import { useState } from "react"

import { LoginForm } from "@/src/domain/interfaces/auth"
import { authenticate } from "@/src/lib/actions/authenticate"

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogIn(loginForm: LoginForm) {
    setIsLoading(true)
    try {
      await authenticate(loginForm)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleLogIn,
    isLoading
  }
}
