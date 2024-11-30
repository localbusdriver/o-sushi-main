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
    DoublesType,
    SummaryType,
} from "@/lib/types/school-summary-types";

export const SummaryTable = ({ results }: { results: SummaryType | null }) => {
    if (results === null) return null;
    return (
        <Table className="rounded-lg">
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

export const DoublesTable = ({ results }: { results: DoublesType | null }) => {
    if (results === null) {
        return null;
    }
    return (
        <Table className="rounded-lg">
            <TableCaption>Double Orders</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableCell
                        colSpan={6}
                        className="text-center font-bold text-primary"
                    >
                        Double Orders
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableHead className="w-[100px]" colSpan={2}>
                        Name
                    </TableHead>
                    <TableHead className="text-blue-500">Item</TableHead>
                    <TableHead className="text-orange-500">Quantity</TableHead>
                    <TableHead className="text-indigo-500">
                        Organization
                    </TableHead>
                    <TableHead className="text-amber-500">Room no.</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(results).map(([key, value]) => (
                    <TableRow key={key}>
                        <TableCell
                            className="font-medium text-green-500"
                            colSpan={2}
                        >
                            {value.student}
                        </TableCell>
                        <TableCell className="flex flex-col gap-2 text-blue-500">
                            <span>{value.item.split(" - ")[0]}</span>
                            <span>{value.item.split(" - ")[1]}</span>
                        </TableCell>
                        <TableCell className="text-orange-500">
                            {value.quantity}
                        </TableCell>
                        <TableCell className="text-indigo-500">
                            {value.school}
                        </TableCell>
                        <TableCell className="text-amber-500">
                            {value.roomNumber}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
