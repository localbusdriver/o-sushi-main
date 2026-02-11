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

import type {
    DoublesResponse,
    DoublesType,
    SummaryType,
} from "@/lib/types/school-summary-types";

export const SummaryTable = ({ results }: { results: SummaryType | null }) => {
    if (results === null) return null;
    return (
        <div className="w-full">
            <Table>
                <TableCaption className="mt-6">Report Summary</TableCaption>
                <TableHeader className="bg-muted/50 sticky top-0 backdrop-blur">
                    <TableRow className="hover:bg-transparent">
                        <TableCell
                            colSpan={4}
                            className="bg-primary/5 border-primary/20 text-primary border-b-2 py-4 text-center font-bold"
                        >
                            Order Summary
                        </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                        <TableHead
                            className="bg-muted sticky top-[57px] px-4 py-3 font-semibold"
                            colSpan={2}
                        >
                            Item
                        </TableHead>
                        <TableHead className="bg-muted sticky top-[57px] px-4 py-3 text-right font-semibold">
                            Rolls
                        </TableHead>
                        <TableHead className="bg-muted sticky top-[57px] px-4 py-3 text-right font-semibold">
                            Pieces
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results ? (
                        Object.entries(results).map(([item, obj]) =>
                            item !== "Total" ? (
                                <TableRow
                                    key={item}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <TableCell
                                        className="px-4 py-3 font-medium"
                                        colSpan={2}
                                    >
                                        {item}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-right">
                                        {obj / 10}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-right">
                                        {obj}
                                    </TableCell>
                                </TableRow>
                            ) : null
                        )
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-destructive px-4 py-8 text-center"
                            >
                                No Summary
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

                <TableFooter className="bg-muted/80 font-semibold">
                    <TableRow className="hover:bg-muted/80">
                        <TableCell className="px-4 py-3" colSpan={2}>
                            Total
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                            {results.Total / 10}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                            {results.Total}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export const DoublesTable = ({ data }: { data: DoublesResponse | null }) => {
    if (data === null || data === undefined) {
        return null;
    }

    const results = data.results as DoublesType[];
    const isEmpty =
        results === undefined || results === null || results.length === 0;
    const errorMessage = data?.message;

    console.log(`results: ${data}`);

    return (
        <div className="w-full">
            <Table>
                <TableCaption className="mt-6">
                    Double Orders Report
                </TableCaption>
                <TableHeader className="bg-muted/50 sticky top-0 backdrop-blur">
                    <TableRow className="hover:bg-transparent">
                        <TableCell
                            colSpan={6}
                            className="bg-primary/5 border-primary/20 text-primary border-b-2 py-4 text-center font-bold"
                        >
                            Double Orders
                        </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                        <TableHead
                            className="bg-muted sticky top-[57px] px-4 py-3 font-semibold text-green-700"
                            colSpan={2}
                        >
                            Name
                        </TableHead>
                        <TableHead className="bg-muted sticky top-[57px] px-4 py-3 font-semibold text-blue-500">
                            Item
                        </TableHead>
                        <TableHead className="bg-muted sticky top-[57px] px-4 py-3 font-semibold text-orange-500">
                            Quantity
                        </TableHead>
                        <TableHead className="bg-muted sticky top-[57px] px-4 py-3 font-semibold text-indigo-500">
                            Organization
                        </TableHead>
                        <TableHead className="bg-muted sticky top-[57px] px-4 py-3 font-semibold text-amber-500">
                            Room no.
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isEmpty ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-muted-foreground px-4 py-8 text-center"
                            >
                                {errorMessage || "No double orders found"}
                            </TableCell>
                        </TableRow>
                    ) : (
                        results &&
                        Object.entries(results).map(([key, value]) => (
                            <TableRow
                                key={key}
                                className="hover:bg-muted/50 transition-colors"
                            >
                                <TableCell
                                    className="px-4 py-3 font-medium text-green-700"
                                    colSpan={2}
                                >
                                    {value.member}
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div className="flex flex-col gap-1 text-blue-500">
                                        <span className="font-medium">
                                            {value.item.split(" - ")[0]}
                                        </span>
                                        <span className="text-xs">
                                            {value.item.split(" - ")[1]}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 font-medium text-orange-500">
                                    {value.quantity}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-indigo-500">
                                    {value.organization}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-amber-500">
                                    {value.roomNumber}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
