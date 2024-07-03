import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="px-36 py-24 absolute bottom-0 w-full bg-secondary">
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
