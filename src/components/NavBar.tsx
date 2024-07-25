"use server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FC } from "react";

const NavBar: FC = async () => {
  return (
    <nav className="px-36 w-full fixed top-0 flex flex-row justify-between items-center bg-primary-foreground z-[1000]">
      <Link href="/home" className="py-8 text-3xl font-semibold text-primary">
        O&apos;Sushi
      </Link>

      <div className="flex flex-row gap-8 items-center">
        <Link href="/menu" className="nav-btn">
          menu
        </Link>
        <Link href="/about" className="nav-btn">about</Link>

        <Button
          variant="outline"
          className="border-2 border-primary hover:bg-primary hover:text-white text-lg py-1 px-3"
        >
          Contact us
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
