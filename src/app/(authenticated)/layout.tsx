import { SidebarProvider, SidebarTrigger } from "@src/components/ui/sidebar"
import { LayoutSidebar } from "@src/components/layout/sidebar"
import { SignoutBar } from "@src/components/layout/singout-bar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutSidebar />
      <main className="bg-bg-secondary w-full h-screen">
        <SignoutBar />
        <div className="ml-12 mr-2">{children}</div>
      </main>
    </SidebarProvider>
  )
}
