import ProtectedNav from "@/components/protected-components/protected-nav";

export const metadata = {
    title: "Admin",
};

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ProtectedNav />
            <main className="md:mt-24 md:px-36">{children}</main>
        </>
    );
}

export default Layout;
