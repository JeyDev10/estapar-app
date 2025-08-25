"use client"
import Image from "next/image"

import { useForm, SubmitHandler } from "react-hook-form"
import { User, Lock } from "lucide-react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useLogin } from "@/src/features/authentication/hooks/use-login"
import { Input, Button } from "@src/components/ui"
import { LoginForm } from "@src/domain/interfaces/auth"

export default function Login() {
  const { handleLogIn } = useLogin()

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-primary flex flex-col gap-5 items-center justify-center w-full h-full"
    >
      <Image alt="logo estapar" width={190} height={55} src="/estapar-logo.svg" />
      <div className="bg-bg-secondary h-min-[300px] w-[450px] px-6 py-12 rounded-md border-2 border-gray-tertiary shadow-md">
        <div className="mb-5">
          <span className="font-bold text-sm">Entre com suas credenciais para acessar o sitema</span>
        </div>
        <div className="flex gap-4 flex-col">
          <Input label="Usuário" placeholder="Digite seu usuário" icon={User} {...register("username")} />
          <Input type="password" label="Senha" placeholder="Digite sua senha" icon={Lock} {...register("password")} />
          <Button type="submit">Entrar</Button>
        </div>
      </div>
    </form>
  )
}
