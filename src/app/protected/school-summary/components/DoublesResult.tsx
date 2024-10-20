"use client";
import type { Items, Doubles } from "../types";
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

export default function DoubleOrders({ results }: { results: Doubles | null }) {
  return (
    <div className="mt-8">
      <Table className=" border border-black mx-auto w-[500px]">
        <TableCaption>Double Orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-primary font-bold text-center"
            >
              Double Orders
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px]" colSpan={2}>
              Name
            </TableHead>
            <TableHead className="text-left">Item</TableHead>
            <TableHead className="text-left">Quantity</TableHead>
            <TableHead className="text-left">Organization</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results ? (
            Object.entries(results).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="font-medium" colSpan={2}>
                  {value.member}
                </TableCell>
                <TableCell className="text-left">{value.item}</TableCell>
                <TableCell className="text-left">{value.quantity}</TableCell>
                <TableCell className="text-left">{value.organization}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-destructive">No Doubles</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
