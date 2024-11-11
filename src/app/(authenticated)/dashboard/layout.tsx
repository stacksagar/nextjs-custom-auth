"use client";

import React from "react";
import { DashboardSidebar } from "@/app/(authenticated)/dashboard/dashboard-sidebar";

import { Separator } from "@/components/ui/separator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Breadcrumbs from "./Breadcrumbs";
import useLogout from "@/hooks/useLogout";
import Button from "@/components/common/Button";

export default function Page({ children }: { children: React.ReactNode }) {
  const { logout, loading } = useLogout();
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs />

          <div className="ml-auto">
            <Button loading={loading} onClick={logout}>
              Logout
            </Button>
          </div>
        </header>
        <main className="p-6"> {children} </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
