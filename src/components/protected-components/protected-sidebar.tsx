import Link from "next/link";

import { Home, Newspaper, School } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { navLinks } from "@/lib/data/protected-sidebar-data";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>O&apos;sushi</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navLinks.map((item) => (
                                <SidebarMenuItem key={item.title + item.href}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.href} passHref>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
