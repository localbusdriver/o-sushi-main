"use client";

import React, { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BillingInfoType,
  Item,
  PaymentDetailsType,
  TotalType,
} from "@/lib/types/invoice-generator-types";

import InvoiceItem from "./invoice-item";
import InvoiceModal from "./invoice-modal";

const InvoiceForm = ({ currentDate }: { currentDate?: string }) => {
  const [modifiers, setModifiers] = useState<PaymentDetailsType>({
    currency: "$",
    invoiceNumber: 1,
    dateOfIssue: "",
    notes: "",
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfoType>({
    billTo: "",
    billToEmail: "",
    billToAddress: "",
    billFrom: "",
    billFromEmail: "",
    billFromAddress: "",
  });

  const [final, setFinal] = useState<TotalType>({
    total: 0,
    subTotal: 0,
    taxRate: 0,
    taxAmount: 0,
    discountRate: 0,
    discountAmount: 0,
  });

  const [items, setItems] = useState<Item[]>([
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  const handleCalculateTotal = useCallback(() => {
    let newSubTotal: number = items.reduce((acc, item) => {
      return acc + parseFloat(item.price) * item.quantity;
    }, 0);

    let newtaxAmount: number = newSubTotal * (final.taxRate / 100);
    let newdiscountAmount: number = newSubTotal * (final.discountRate / 100);
    let newTotal: number = newSubTotal - newdiscountAmount + newtaxAmount;

    setFinal(() => ({
      ...final,
      subTotal: newSubTotal,
      taxAmount: newtaxAmount,
      discountAmount: newdiscountAmount,
      total: newTotal,
    }));
  }, [items, final]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item: Item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  const onItemizedItemEdit = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = evt.target;

    console.log(id, name, value);

    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };
  return (
    <form id="Invoice-Form">
      <div className="flex-row flex-wrap gap-12 md:flex">
        <Card className="my-3 flex flex-col xl:my-4 xl:p-5">
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
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={modifiers.currency}
              items={items}
            />
            <div className="mt-4 flex flex-row justify-end">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-start justify-between">
                  <span className="font-bold">Subtotal:</span>&nbsp;
                  <span>
                    {modifiers.currency}
                    {final.subTotal}
                  </span>
                </div>
                <div className="flex flex-row items-start justify-between">
                  <span className="font-bold">Discount:</span>&nbsp;
                  <span>
                    <span className="text-small">
                      ({final.discountRate || 0}%)
                    </span>
                    &nbsp;
                    {modifiers.currency}
                    {final.discountAmount || 0}
                  </span>
                </div>
                <div className="flex flex-row items-start justify-between">
                  <span className="font-bold">Tax:</span>&nbsp;
                  <span>
                    <span className="text-small">({final.taxRate || 0}%)</span>
                    &nbsp;
                    {modifiers.currency}
                    {final.taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div className="flex flex-row items-start justify-between text-[1.125rem]">
                  <span className="font-bold">Total:</span>&nbsp;
                  <span className="font-bold">
                    {modifiers.currency}
                    {final.total || 0}
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
        <Card className="flex max-h-[343px] flex-col">
          <CardHeader className="sticky pt-3 xl:pt-4">
            <InvoiceModal
              billingInfo={billingInfo}
              modifiers={modifiers}
              items={items}
              final={final}
            />
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <Label className="font-bold">Currency:</Label>
              <Select
                onValueChange={(val) => {
                  setModifiers(() => ({ ...modifiers, currency: val }));
                }}
                value={modifiers.currency}
                aria-label="Change Currency"
              >
                <SelectTrigger>Change Currency</SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">NZD (New Zealand Dollar)</SelectItem>
                  <SelectItem value="$">USD (United States Dollar)</SelectItem>
                  <SelectItem value="£">
                    GBP (British Pound Sterling)
                  </SelectItem>
                  <SelectItem value="¥">JPY (Japanese Yen)</SelectItem>
                  <SelectItem value="$">CAD (Canadian Dollar)</SelectItem>
                  <SelectItem value="$">AUD (Australian Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="my-3 flex gap-8">
              <div className="">
                <Label className="font-bold">Tax rate:</Label>
                <div className="justify center my-1 flex max-w-max flex-nowrap items-center">
                  <Input
                    name="taxRate"
                    type="number"
                    value={final.taxRate}
                    onChange={(e) => {
                      setFinal({ ...final, taxRate: +e.target.value });
                      handleCalculateTotal();
                    }}
                    className="rounded-r-none border bg-white/[0.5]"
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
                    value={final.discountRate}
                    onChange={(e) => {
                      setFinal({ ...final, discountRate: +e.target.value });
                      handleCalculateTotal();
                    }}
                    className="rounded-r-none border bg-white/[0.5]"
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
          <CardFooter>
            <Button variant="secondary" type="submit" className="block w-full">
              Review Invoice
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default InvoiceForm;
