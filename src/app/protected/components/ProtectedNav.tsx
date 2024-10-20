"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ProtectedNav = () => {
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <nav className="fixed left-[50%] top-8 flex w-fit -translate-x-[50%] items-center gap-6 rounded-lg border-[1px] border-neutral-200 bg-neutral-100 bg-opacity-20 p-2 text-sm text-neutral-500">
      <Link href="/protected/main">
        <Logo />
      </Link>
      <NavLink url="/protected/school-summary">School</NavLink>
      {/* <NavLink url="/protected/school-summary/summary">School Summary</NavLink>
      <NavLink url="/protected/school-summary/doubles">Double orders</NavLink> */}
      <Button variant="ghost" onClick={handleSignOut}>
        Exit
      </Button>
    </nav>
  );
};

const Logo = () => {
  return (
    <svg
      width="24"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 fill-primary"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

const NavLink = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={url} rel="nofollow" className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center  text-primary">
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

export default ProtectedNav;
