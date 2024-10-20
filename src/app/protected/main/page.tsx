import Link from "next/link";

// import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4">
      <Link
        href="/protected/school-summary"
        className="rounded border p-4 text-xl"
      >
        School Summary
      </Link>
      <Link
        href="/protected/invoice-generator"
        className="rounded border p-4 text-xl"
      >
        Invoice Generator
      </Link>
    </div>
  );
};

export default Page;
