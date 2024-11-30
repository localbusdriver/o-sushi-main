import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
                <main className="mt-12 w-full px-36 lg:mt-24">{children}</main>
            </SidebarProvider>
        </>
    );
}

export default Layout;
