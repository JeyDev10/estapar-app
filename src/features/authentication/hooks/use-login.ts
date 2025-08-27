import { useState } from "react"
import { useRouter } from "next/navigation"

import { LoginForm } from "@/src/domain/interfaces/auth"
import { authenticate } from "@/src/lib/actions/authenticate"

import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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

  const loginSchema = z.object({
    username: z.string().min(4, "Usuário é obrigatório"),
    password: z.string().min(6, "Senha é obrigatória").max(20, "Senha deve ter no máximo 20 caracteres")
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    handleLogIn(data)
  }

  return {
    isLoading,
    hasError,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    register
  }
}
