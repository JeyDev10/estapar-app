"use client"
import { LogOut, User } from "lucide-react"

import { Button } from "@src/components/ui/button"
import { signOut } from "@/src/lib/actions/authenticate"
import { useSession } from "next-auth/react"

export function SignoutBar() {
  const { data } = useSession()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <div className="flex items-center gap-2 justify-end p-4 bg-bg-secondary">
      <div className="flex items-center gap-2 text-gray-secondary">
        <User size={16} />
        <span>{data?.user?.name}</span>
      </div>
      <Button variant="transparent" icon={LogOut} onClick={() => handleSignOut()}>
        Sair
      </Button>
    </div>
  )
}
