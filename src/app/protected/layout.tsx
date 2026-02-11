import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import { AppSidebar } from "@/components/protected-components/protected-sidebar";

export const metadata = {
    title: "Admin",
};

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <main className="mt-12 w-full lg:mt-24 xl:px-36">
                    {children}
                </main>
                <Toaster />
            </SidebarProvider>
        </>
    );
}

export default Layout;
