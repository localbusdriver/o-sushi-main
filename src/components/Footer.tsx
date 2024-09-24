"use server";

import Link from "next/link";
import { FC } from "react";

const Footer: FC = async () => {
  return (
    <footer className="absolute bottom-0 z-[-100] w-full bg-secondary px-36 py-24">
      <p className="text-gray-500">
        &copy; 2010 O&apos;Sushi. All rights reserved.
      </p>
      <Link
        href="/login"
        className="text-gray-500 hover:text-primary hover:underline"
      >
        Admin login
      </Link>
    </footer>
  );
};

export default Footer;
