import { SidebarProvider, SidebarTrigger } from "@src/components/ui/sidebar"
import { LayoutSidebar } from "@src/components/layout/sidebar"
import { SignoutBar } from "@src/components/layout/singout-bar"

import { SessionProvider } from "next-auth/react"

import { getAuth } from "@src/lib/actions/authenticate"

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuth()
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <LayoutSidebar />
        <main className="bg-bg-secondary w-full h-screen">
          <SignoutBar username={session?.user?.name || ""} />
          <div className="ml-12 mr-2">{children}</div>
        </main>
      </SidebarProvider>
    </SessionProvider>
  )
}
