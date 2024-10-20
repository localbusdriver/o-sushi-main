"use server";

import { Route } from "next";
import Link from "next/link";
import { FC } from "react";

const Footer: FC = async () => {
  return (
    <footer className="absolute bottom-0 z-[-100] w-full bg-secondary px-36 py-10">
      <p className="text-gray-500">
        &copy; 2010 O&apos;Sushi. All rights reserved.
      </p>
      <Link
        href={"/protected/main" as Route}
        // href={"/login" as Route}
        className="border-b text-gray-500 hover:border-b-blue-700 hover:text-primary"
      >
        Admin
      </Link>
    </footer>
  );
};

export default Footer;
