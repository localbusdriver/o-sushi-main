import Link from "next/link";
// import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-1 gap-4">
      <Link href="/protected/school-summary" className="text-xl border rounded p-4">School Summary</Link>
      <Link href="/protected/invoice-generator" className="text-xl border rounded p-4">Invoice Generator</Link>
    </div>
  );
};

export default Page;
