import { LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SignoutBar() {
  return (
    <div className="flex items-center gap-2 justify-end p-4 bg-bg-secondary">
      <div className="flex items-center gap-2 text-gray-secondary">
        <User size={16} />
        <span>Roberto Freitas</span>
      </div>
      <Button variant="transparent" icon={LogOut}>
        Sair
      </Button>
    </div>
  )
}
