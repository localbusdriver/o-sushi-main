import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { Summary } from "@/lib/types/school-summary-types";

const SummaryTable = ({ results }: { results: Summary | null }) => {
    if (results === null) return null;
    return (
        <Table className="mx-auto rounded-lg bg-white">
            <TableCaption>Report Summary</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableCell
                        colSpan={4}
                        className="text-center font-bold text-primary"
                    >
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
                                <TableCell className="text-right">
                                    {obj / 10}
                                </TableCell>
                                <TableCell className="text-right">
                                    {obj}
                                </TableCell>
                            </TableRow>
                        ) : null
                    )
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={5}
                            className="text-center text-destructive"
                        >
                            No Summary
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">
                        {results.Total / 10}
                    </TableCell>
                    <TableCell className="text-right">
                        {results.Total}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default SummaryTable;
