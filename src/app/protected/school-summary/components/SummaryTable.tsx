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
    <div className="mt-8 ">
      <Table className="w-96 border border-black mx-auto">
        <TableCaption>Report Summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell colSpan={4} className="text-primary font-bold text-center">
              Order Summary
            </TableCell>
          </TableRow>
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
              item !== "Total" ? (
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
              <TableCell colSpan={5} className="text-center text-destructive">
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
                {results.Total?.rolls}
              </TableCell>
              <TableCell className="text-right">
                {results.Total?.pieces}
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </div>
  );
};

export default SummaryTable;
