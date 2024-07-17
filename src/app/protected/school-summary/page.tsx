"use server";

import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page: FC = () => {
  return (
    <section className="page">
      <ul className="flex flex-col gap-2">
        <h1>Links</h1>
        <li>
          <Link href="/protected/school-summary/doubles">
            <Button>School Summary</Button>
          </Link>
        </li>
        <li>
          <Link href="/protected/teacher-summary">
            <Button>Teacher Summary</Button>
          </Link>
        </li>
        <li>
          <Link href="/protected/student-summary">
            <Button>Student Summary</Button>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Page;
