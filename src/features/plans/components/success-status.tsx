import { CircleCheck } from "lucide-react"

export function SuccessStatus() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <CircleCheck className="text-brand-tertiary animate-bounce h-10 w-10" />
        <span className="text-3xl">Plano Criado com sucesso!</span>
      </div>
    </>
  )
}
