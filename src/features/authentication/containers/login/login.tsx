"use client"
import Image from "next/image"

import { User, Lock } from "lucide-react"

import { useLogin } from "@/src/features/authentication/hooks/use-login"
import { Input, Button } from "@src/components/ui"

export default function Login() {
  const { isLoading, hasError, handleSubmit, errors, register } = useLogin()

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg-primary flex flex-col gap-5 items-center justify-center w-full h-full"
    >
      <Image alt="logo estapar" width={190} height={55} src="/estapar-logo.svg" />
      <div className="bg-bg-secondary h-min-[300px] w-[450px] px-6 py-12 rounded-md border-2 border-gray-tertiary shadow-md">
        <div className="mb-5">
          <span className="font-bold text-sm">Entre com suas credenciais para acessar o sitema</span>
        </div>
        <div className="flex gap-4 flex-col">
          <Input
            label="Usuário"
            placeholder="Digite seu usuário"
            icon={User}
            {...register("username")}
            aria-invalid={!!errors.username}
          />
          {errors.username && <span className="text-sm text-red-400">{errors.username.message}</span>}
          <Input
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            icon={Lock}
            {...register("password")}
            aria-invalid={!!errors.password}
          />
          {errors.password && <span className="text-sm text-red-400">{errors.password.message}</span>}
          <Button disabled={isLoading} isLoading={isLoading} type="submit">
            Entrar
          </Button>
          {hasError && <span className="text-sm text-red-400">Não foi possível efetuar o login.</span>}
        </div>
      </div>
    </form>
  )
}
