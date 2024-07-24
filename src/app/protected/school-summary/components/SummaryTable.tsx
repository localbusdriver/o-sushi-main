import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import type { Summary } from "../types";

const SummaryTable = ({ results }: { results: Summary | null }) => {
  return (
    <div className="mt-8 text-left">
      <Table className="w-96 border border-black mx-auto">
        <TableCaption>Report Summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]" colSpan={2}>
              Item
            </TableHead>
            <TableHead className="text-right">Rolls</TableHead>
            <TableHead className="text-right">Pieces</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results ? (
            Object.entries(results).map(([item, obj]) =>
              item !== "Total Rolls" && item !== "Total Pieces" ? (
                <TableRow key={item}>
                  <TableCell className="font-medium" colSpan={2}>
                    {item}
                  </TableCell>
                  <TableCell className="text-right">{obj.rolls}</TableCell>
                  <TableCell className="text-right">{obj.pieces}</TableCell>
                </TableRow>
              ) : null
            )
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="">
                No Summary
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          {results && (
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {results["Total"]?.rolls}
              </TableCell>
              <TableCell className="text-right">
                {results["Total"]?.pieces}
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </div>
  );
};

export default SummaryTable;
