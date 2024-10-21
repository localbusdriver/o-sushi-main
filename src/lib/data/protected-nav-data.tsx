export type NavLinkType = {
    id: number;
    name: string;
    url: string;
};
export const navLinks: NavLinkType[] = [
    {
        id: 2,
        name: "School",
        url: "/protected/school-summary",
    },
    {
        id: 3,
        name: "Invoice",
        url: "/protected/invoice-generator",
    },
];
