import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"

export function LayoutSidebar() {
  return (
    <div>
      <SidebarTrigger className={cn("bg-bg-primary border border-gray-tertiary rounded-full text-gray-primary")} />

      <Sidebar>
        <SidebarHeader className="items-center">
          <Image src={"/estapar-logo.svg"} alt="Logo" width={130} height={50} />
        </SidebarHeader>
        <SidebarContent className="relative">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem className="w-full">
                <SidebarMenuButton asChild>
                  <span>testando...</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  )
}
