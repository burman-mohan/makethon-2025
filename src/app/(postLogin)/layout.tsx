import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <SidebarProvider>
    //   <AppSidebar />
    //   <main>
    //     <SidebarTrigger />
    //     {children}
    //   </main>
    // </SidebarProvider>

    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        
          <SidebarTrigger className="-ml-1" />
          {children}

      </SidebarInset>
    </SidebarProvider>
  );
}
