"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { navLinks } from "@/lib/data/protected-nav-data";

const ProtectedNav = () => {
  const scrollYProgress = useScroll().scrollYProgress;
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

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
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className="border-black/.1 fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center gap-1 space-x-2 rounded-lg border px-6 py-4 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:min-w-[70vw] lg:min-w-fit"
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.125)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <Link href="/protected/main">
          <Logo />
        </Link>
        {navLinks.map((link) => (
          <NavLink key={link.id} url={link.url}>
            {link.name}
          </NavLink>
        ))}
        <NavLink onClick={handleSignOut}>Exit</NavLink>
      </motion.nav>
    </AnimatePresence>
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
  onClick,
}: {
  url?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={url || ""}
      rel="nofollow"
      className="block overflow-hidden"
      onClick={onClick}
    >
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center text-primary">
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

export default ProtectedNav;
