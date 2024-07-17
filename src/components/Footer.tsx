"use server"

import { FC } from "react";
import Link from "next/link";

const Footer: FC = async () => {
  return (
    <footer className="px-36 py-24 absolute bottom-0 w-full bg-secondary z-[-100]">
      <p className="text-gray-500">&copy; 2021 O'Sushi. All rights reserved.</p>
      <Link
        href="/login"
        className="text-gray-500 hover:underline hover:text-primary"
      >
        Admin login
      </Link>
    </footer>
  );
};

export default Footer;
