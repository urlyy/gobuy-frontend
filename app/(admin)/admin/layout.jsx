'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, ShoppingBag,BadgeJapaneseYen,Undo2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function AdminLayout({ children }) {
  const pathname = usePathname()

  return (
    <div>
      <SidebarProvider>
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <h2 className="text-xl font-bold p-4">后台管理</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={cn(
                    "w-full justify-start",
                    pathname === "/admin/users" && "bg-muted"
                  )}>
                    <Link href="/admin/users">
                      <Users className="mr-2 h-4 w-4" />
                      用户管理
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={cn(
                    "w-full justify-start",
                    pathname === "/admin/products" && "bg-muted"
                  )}>
                    <Link href="/admin/products">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      商品管理
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={cn(
                    "w-full justify-start",
                    pathname === "/admin/orders" && "bg-muted"
                  )}>
                    <Link href="/admin/orders">
                      <BadgeJapaneseYen className="mr-2 h-4 w-4" />
                      订单管理
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={cn(
                    "w-full justify-start",
                    pathname === "/" && "bg-muted"
                  )}>
                    <Link href="/">
                      <Undo2 className="mr-2 h-4 w-4" />
                      返回前台
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <div className="w-full overflow-auto">
            <header className="flex items-center h-16 px-4 border-b">
              <SidebarTrigger />
              <h1 className="ml-4 text-xl font-semibold">面板</h1>
            </header>
            <main className="p-4">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
    
  )
}

