"use server";

import { Route } from "next";
import Link from "next/link";

import { FC } from "react";

import { Button } from "@/components/ui/button";

const NavBar: FC = async () => {
    return (
        <nav className="fixed top-0 z-[1000] flex w-full flex-row items-center justify-between bg-primary-foreground px-36">
            <Link
                href="/home"
                className="py-8 text-3xl font-semibold text-primary"
            >
                O&apos;Sushi
            </Link>

            <div className="flex flex-row items-center gap-8">
                <Link href={"/menu" as Route} className="nav-btn">
                    Menu
                </Link>
                <Link href={"/about" as Route} className="nav-btn">
                    About
                </Link>

                <Button
                    variant="outline"
                    className="border-2 border-primary px-3 py-1 text-lg hover:bg-primary hover:text-white"
                >
                    Contact us
                </Button>
            </div>
        </nav>
    );
};

export default NavBar;
