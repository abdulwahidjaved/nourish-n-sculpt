
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 overflow-auto pt-14 md:pt-0">
        <div className="fixed top-0 left-0 right-0 z-20 flex h-14 items-center border-b bg-background px-4 md:hidden">
          <SidebarTrigger className="-ml-2 mr-2" />
          <div className="font-heading font-bold">NourishFit</div>
        </div>
        <main className="container mx-auto p-4 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
