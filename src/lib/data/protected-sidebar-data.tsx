import { Route } from "next";

import { ReactElement } from "react";

import { FileText, School } from "lucide-react";

export type NavLinkType = {
    title: string;
    description: string;
    icon: ReactElement;
    href: Route;
    disabled?: boolean;
};

export const navLinks: NavLinkType[] = [
    {
        title: "Manual School Summary",
        description: "View and manage school-related data and analytics",
        icon: <School className="h-8 w-8 sm:h-6 sm:w-6" />,
        href: "/protected/school-summary",
    },
    {
        title: "WIP",
        description: "View and manage school-related data and analytics",
        icon: <School className="h-8 w-8 sm:h-6 sm:w-6" />,
        href: "/protected/auto-school-summary",
        disabled: true,
    },
    {
        title: "WIP",
        // title: "Invoice Generator",
        description: "Create and manage invoices",
        icon: <FileText className="h-8 w-8 sm:h-6 sm:w-6" />,
        // href: "/protected/invoice-generator",
        href: "/",
        disabled: true,
    },
];
