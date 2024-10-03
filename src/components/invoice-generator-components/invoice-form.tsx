"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Decimal } from "decimal.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BillingInfoType,
  Item,
  PaymentDetailsType,
  TotalType,
} from "@/lib/types/invoice-generator-types";
import { formatDecimal } from "@/lib/utils";

import InvoiceItem from "./invoice-item";

const InvoiceForm: React.FC<{ currentDate?: string }> = ({ currentDate }) => {
  const generateInvoice = () => {
    const captureElement: HTMLElement | null =
      document.getElementById("invoice-capture");
    if (!captureElement) return;
    html2canvas(captureElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      window.open(pdf.output("bloburl"), "_blank");
      // pdf.save("invoice-001.pdf");
    });
  };

  const itemIdCounterRef = useRef(0);
  const generateItemId = useCallback(() => {
    itemIdCounterRef.current += 1;
    return `item-${itemIdCounterRef.current}`;
  }, []);

  const [modifiers, setModifiers] = useState<PaymentDetailsType>({
    currency: "$",
    invoiceNumber: 1,
    dateOfIssue: "",
    notes: "",
  });

  const [items, setItems] = useState<Item[]>([
    {
      id: generateItemId(),
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  const [final, setFinal] = useState<TotalType>({
    total: new Decimal(0),
    subTotal: new Decimal(0),
    taxRate: new Decimal(0),
    taxAmount: new Decimal(0),
    discountRate: new Decimal(0),
    discountAmount: new Decimal(0),
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfoType>({
    billTo: "",
    billToEmail: "",
    billToAddress: "",
    billFrom: "",
    billFromEmail: "",
    billFromAddress: "",
  });

  const handleCalculateTotal = useCallback(() => {
    let newSubTotal: Decimal = items.reduce(
      (acc, item) => acc.plus(new Decimal(item.price).times(item.quantity)),
      new Decimal(0)
    );
    let newtaxAmount: Decimal = newSubTotal.times(final.taxRate.dividedBy(100));
    let newdiscountAmount: Decimal = newSubTotal.times(
      final.discountRate.dividedBy(100)
    );
    let newTotal: Decimal = newSubTotal
      .minus(newdiscountAmount)
      .plus(newtaxAmount);

    setFinal((final) => ({
      ...final,
      subTotal: newSubTotal,
      taxAmount: newtaxAmount,
      discountAmount: newdiscountAmount,
      total: newTotal,
    }));
  }, [items, final.taxRate, final.discountRate]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item: Item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = useCallback(() => {
    const newItem = {
      id: generateItemId(),
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  }, [generateItemId]);

  const onItemizedItemEdit = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = evt.target;
    const prev = items;
    const updatedItems = prev.map((item) => {
      if (item.id === id) {
        if (name === "price" || name === "quantity") {
          return { ...item, [name]: new Decimal(value) };
        }
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    console.log("items", items);
  }, [items]);

  return (
    <div id="">
      <div className="mx-auto lg:absolute lg:left-24">
        <Card
          className="my-3 flex flex-col xl:my-4 xl:p-5"
          id="invoice-capture"
        >
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="mb-2">
                  <span className="font-bold">Current&nbsp;Date:&nbsp;</span>
                  <span className="">{currentDate}</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <span className="me-2 block font-bold">Due&nbsp;Date:</span>
                <Input
                  type="date"
                  value={modifiers.dateOfIssue}
                  name="dateOfIssue"
                  onChange={(e) =>
                    setModifiers(() => ({
                      ...modifiers,
                      dateOfIssue: e.target.value,
                    }))
                  }
                  className="max-w-[150px]"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <span className="me-2 font-bold">Invoice&nbsp;Number:&nbsp;</span>
              <Input
                type="number"
                value={modifiers.invoiceNumber}
                name="invoiceNumber"
                onChange={(e) => {
                  setModifiers(() => ({
                    ...modifiers,
                    invoiceNumber: parseInt(e.target.value),
                  }));
                }}
                min="1"
                className="max-w-[70px]"
                required
              />
            </div>
          </CardHeader>
          <hr className="mb-6" />
          <CardContent>
            <div className="mb-5 flex flex-row gap-2">
              <div className="flex flex-col">
                <Label className="font-bold">Bill from:</Label>
                <Input
                  placeholder="Who is this invoice from?"
                  value={billingInfo.billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      billFrom: e.target.value,
                    })
                  }
                  autoComplete="name"
                  required
                />
                <Input
                  placeholder="Email address"
                  value={billingInfo.billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(e) =>
                    setBillingInfo(() => ({
                      ...billingInfo,
                      billFromEmail: e.target.value,
                    }))
                  }
                  autoComplete="email"
                  required
                />
                <Input
                  placeholder="Billing address"
                  value={billingInfo.billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(e) =>
                    setBillingInfo(() => ({
                      ...billingInfo,
                      billFromAddress: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label className="font-bold">Bill to:</Label>
                <Input
                  placeholder="Who is this invoice to?"
                  value={billingInfo.billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(e) =>
                    setBillingInfo({ ...billingInfo, billTo: e.target.value })
                  }
                  autoComplete="name"
                  required
                />
                <Input
                  placeholder="Email address"
                  value={billingInfo.billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      billToEmail: e.target.value,
                    })
                  }
                  autoComplete="email"
                  required
                />
                <Input
                  placeholder="Billing address"
                  value={billingInfo.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(e) =>
                    setBillingInfo({
                      ...billingInfo,
                      billToAddress: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <InvoiceItem
              items={items}
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
            />
            <div className="mt-4 flex flex-row justify-end">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-start justify-between">
                  <span className="font-bold">Subtotal:</span>&nbsp;
                  <span>
                    {modifiers.currency}
                    {formatDecimal(final.subTotal)}
                  </span>
                </div>
                <div className="flex flex-row items-start justify-between">
                  <span className="font-bold">Discount:</span>&nbsp;
                  <span>
                    <span className="text-small">
                      ({formatDecimal(final.discountRate) || 0}%)
                    </span>
                    &nbsp;
                    {modifiers.currency}
                    {formatDecimal(final.discountAmount) || 0}
                  </span>
                </div>
                <div className="flex flex-row items-start justify-between">
                  <span className="font-bold">Tax:</span>&nbsp;
                  <span>
                    <span className="text-small">
                      ({formatDecimal(final.taxRate) || 0}%)
                    </span>
                    &nbsp;
                    {modifiers.currency}
                    {formatDecimal(final.taxAmount) || 0}
                  </span>
                </div>
                <hr />
                <div className="flex flex-row items-start justify-between text-[1.125rem]">
                  <span className="font-bold">Total:</span>&nbsp;
                  <span className="font-bold">
                    {modifiers.currency}
                    {formatDecimal(final.total) || 0}
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <Label className="font-bold">Notes:</Label>
            <Textarea
              placeholder="Thank you for doing business with us. Have a great day!"
              name="notes"
              value={modifiers.notes}
              onChange={(e) =>
                setModifiers({ ...modifiers, notes: e.target.value })
              }
              className="my-2"
              rows={1}
            />
          </CardContent>
        </Card>
        <SidePanel
          final={final}
          setFinal={setFinal}
          handleCalculateTotal={handleCalculateTotal}
          generateInvoice={generateInvoice}
        />
      </div>
    </div>
  );
};

export default InvoiceForm;

type SidePanelProps = {
  final: TotalType;
  setFinal: React.Dispatch<React.SetStateAction<TotalType>>;
  handleCalculateTotal: () => void;
  generateInvoice: () => void;
};
const SidePanel = ({
  final,
  setFinal,
  handleCalculateTotal,
  generateInvoice,
}: SidePanelProps) => {
  return (
    <Card className="mx-auto flex h-fit max-w-max flex-col lg:fixed lg:right-24 lg:top-28">
      {/* <Card className="flex h-fit max-w-max flex-col"> */}
      <CardContent>
        <div className="my-3 flex gap-4">
          <div className="">
            <Label className="font-bold">Tax rate:</Label>
            <div className="justify center my-1 flex max-w-max flex-nowrap items-center">
              <Input
                name="taxRate"
                type="number"
                value={formatDecimal(final.taxRate)}
                onChange={(e) => {
                  setFinal({
                    ...final,
                    taxRate: new Decimal(e.target.value),
                  });
                  handleCalculateTotal();
                }}
                className="max-w-[80px] rounded-r-none border bg-white/[0.5]"
                placeholder="0.0"
                min="0.00"
                step="0.01"
                max="100.00"
              />
              <Label className="flex h-10 items-center rounded rounded-l-none border border-l-0 bg-white/[0.5] px-3 py-2 font-bold">
                %
              </Label>
            </div>
          </div>
          <div>
            <Label className="font-bold">Discount rate:</Label>
            <div className="justify center my-1 flex max-w-max flex-nowrap items-center">
              <Input
                name="discountRate"
                id="discountRate"
                type="number"
                value={formatDecimal(final.discountRate)}
                onChange={(e) => {
                  setFinal({
                    ...final,
                    discountRate: new Decimal(e.target.value),
                  });
                  handleCalculateTotal();
                }}
                className="max-w-[80px] rounded-r-none border bg-white/[0.5]"
                placeholder="0.0"
                min="0.00"
                step="0.01"
                max="100.00"
              />
              <Label
                htmlFor="discountRate"
                className="flex h-10 items-center rounded rounded-l-none border border-l-0 bg-white/[0.5] px-3 py-2 font-bold"
              >
                %
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button onClick={generateInvoice}>Open PDF</Button>
      </CardFooter>
    </Card>
  );
};
