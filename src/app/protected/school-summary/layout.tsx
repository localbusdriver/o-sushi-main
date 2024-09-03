import ProtectedNav from "../components/ProtectedNav";

export const metadata = {
  title: "School-Summary"
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProtectedNav />
      <main className="mt-24 px-36">{children}</main>
    </>
  );
}

export default Layout;
