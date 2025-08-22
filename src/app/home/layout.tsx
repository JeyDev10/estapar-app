import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LayoutSidebar } from "@/components/layout/sidebar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutSidebar />
      <main className="bg-bg-secondary w-full h-screen">{children}</main>
    </SidebarProvider>
  )
}
