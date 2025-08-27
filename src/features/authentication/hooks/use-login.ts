import { useState } from "react"
import { useRouter } from "next/navigation"

import { LoginForm } from "@/src/domain/interfaces/auth"
import { authenticate } from "@/src/lib/actions/authenticate"

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const router = useRouter()

  async function handleLogIn(loginForm: LoginForm) {
    setIsLoading(true)
    setHasError(false)
    try {
      await authenticate(loginForm)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
    router.push("/")
  }

  return {
    handleLogIn,
    isLoading,
    hasError
  }
}
