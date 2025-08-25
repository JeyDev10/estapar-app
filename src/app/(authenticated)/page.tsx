"use client"
import { Building2, ArrowRight } from "lucide-react"

import { Card } from "@src/components/ui/card"
import { redirect } from "next/navigation"

export default function HomePage() {
  function onCardClick() {
    redirect("/garages")
  }

  return (
    <div className="flex flex-col gap-4 max-w-[700px]">
      <h4 className="font-bold text-4xl">Bem vindo ao Portal Estapar B2B</h4>
      <span className="text-gray-secondary">
        Gerencie seus serviços de estacionamento, acesse relatórios, configure credenciados e contrate planos de
        mensalidade em um só lugar.
      </span>
      <Card className="hover:bg-neutral-100/40 cursor-pointer" onClick={onCardClick}>
        <div className="flex items-start justify-between gap-2 mt-4">
          <Building2 size={32} className="text-brand-primary mb-4" />
          <ArrowRight size={24} className="text-gray-tertiary hover:text-gray-secondary" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="block text-2xl font-semibold">Garagens</span>
          <span className="block text-gray-secondary">Veja a lista de garagens disponíveis e suas configurações.</span>
        </div>
      </Card>
    </div>
  )
}
