"use client"
import Image from "next/image"
import { Building2 } from "lucide-react"

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
} from "@src/components/ui/sidebar"

import { cn } from "@src/lib/utils/style-utils"
import { redirect } from "next/navigation"

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
                <SidebarMenuButton
                  asChild
                  onClick={() => {
                    redirect("/garages")
                  }}
                >
                  <div>
                    <Building2 size={20} />
                    <span> Garagens</span>
                  </div>
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
