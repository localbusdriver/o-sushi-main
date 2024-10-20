import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div>
      <Link href="/protected/school-summary">
        <Button>
            School Summary
        </Button>
      </Link>
    </div>
  );
};

export default Page;
