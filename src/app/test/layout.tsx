import { Toaster } from "@/components/ui/toaster";

export const metadata = {
    title: "School-Summary test",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <main className="mt-24">{children}</main>
            <Toaster />
        </div>
    );
}
