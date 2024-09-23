"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";

import { item } from "../types/type";
import { Textarea } from "@/components/ui/textarea";

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("$");
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toLocaleDateString()
  );
  const [invoiceNumber, setInvoiceNumber] = useState<number>(1);
  const [dateOfIssue, setDateOfIssue] = useState<string>("");
  const [billTo, setBillTo] = useState<string>("");
  const [billToEmail, setBillToEmail] = useState<string>("");
  const [billToAddress, setBillToAddress] = useState<string>("");
  const [billFrom, setBillFrom] = useState<string>("");
  const [billFromEmail, setBillFromEmail] = useState<string>("");
  const [billFromAddress, setBillFromAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>(
    "Thank you for doing business with us. Have a great day!"
  );
  const [total, setTotal] = useState<string>("0.00");
  const [subTotal, setSubTotal] = useState<string>("0.00");
  const [taxRate, setTaxRate] = useState<string>("0.00");
  const [taxAmount, setTaxAmount] = useState<string>("0.00");
  const [discountRate, setDiscountRate] = useState<string>("0.00");
  const [discountAmount, setDiscountAmount] = useState<string>("0.00");

  const [items, setItems] = useState<item[]>([
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

    let newtaxAmount: number = newSubTotal * (parseFloat(taxRate) / 100);
    let newdiscountAmount: number =
      newSubTotal * (parseFloat(discountRate) / 100);
    let newTotal: number = newSubTotal - newdiscountAmount + newtaxAmount;

    setSubTotal(newSubTotal.toString());
    setTaxAmount(newtaxAmount.toString());
    setDiscountAmount(newdiscountAmount.toString());
    setTotal(newTotal.toString());
  }, [items, taxRate, discountRate]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item: item) => {
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

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<any>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
      handleCalculateTotal();
    };

  const openModal = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <form id="Invoice-Form" onSubmit={openModal}>
      <div className="flex flex-row gap-12">
        <div className="flex flex-col">
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="flex flex-row items-start justify-between mb-3">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="mb-2">
                    <span className="font-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="">{currentDate}</span>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <span className="font-bold block me-2">Due&nbsp;Date:</span>
                  <Input
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={handleChange(setDateOfIssue)}
                    className="max-w-[150px]"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <span className="font-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Input
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={handleChange(setInvoiceNumber)}
                  min="1"
                  style={{ maxWidth: "70px" }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="mb-5 flex flex-row">
              <div className="flex flex-col">
                <Label className="font-bold">Bill from:</Label>
                <Input
                  placeholder="Who is this invoice from?"
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={handleChange(setBillFrom)}
                  autoComplete="name"
                  required
                />
                <Input
                  placeholder="Email address"
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={handleChange(setBillFromEmail)}
                  autoComplete="email"
                  required
                />
                <Input
                  placeholder="Billing address"
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setBillFromAddress)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Label className="font-bold">Bill to:</Label>
                <Input
                  placeholder="Who is this invoice to?"
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={handleChange(setBillTo)}
                  autoComplete="name"
                  required
                />
                <Input
                  placeholder="Email address"
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={handleChange(setBillToEmail)}
                  autoComplete="email"
                  required
                />
                <Input
                  placeholder="Billing address"
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setBillToAddress)}
                  required
                />
              </div>
            </div>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <div className="flex flex-row mt-4 justify-end">
              <div className="flex flex-col">
                <div className="flex flex-row items-start justify-between">
                  <span className="font-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="flex flex-row items-start justify-between mt-2">
                  <span className="font-bold">Discount:</span>
                  <span>
                    <span className="text-small ">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="flex flex-row items-start justify-between mt-2">
                  <span className="font-bold">Tax:</span>
                  <span>
                    <span className="text-small ">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="flex flex-row items-start justify-between"
                  style={{ fontSize: "1.125rem" }}
                >
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <Label className="font-bold">Notes:</Label>
            <Textarea
              placeholder="Thank you for doing business with us. Have a great day!"
              name="notes"
              value={notes}
              onChange={handleChange(setNotes)}
              className="my-2"
              rows={1}
            />
          </Card>
        </div>
        <div className="flex flex-col">
          <div className="sticky pt-3 pt-xl-4">
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                dateOfIssue,
                invoiceNumber,
                billTo,
                billToEmail,
                billToAddress,
                billFrom,
                billFromEmail,
                billFromAddress,
                notes,
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
              total={total}
            />

            <div className="mb-3">
              <Label className="font-bold">Currency:</Label>
              <Select
                onValueChange={(value: string) => {
                  setCurrency(value);
                }}
                aria-label="Change Currency"
              >
                <SelectTrigger>Change Currency</SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">USD (United States Dollar)</SelectItem>
                  <SelectItem value="£">
                    GBP (British Pound Sterling)
                  </SelectItem>
                  <SelectItem value="₹">INR (Indian Rupee)</SelectItem>
                  <SelectItem value="¥">JPY (Japanese Yen)</SelectItem>
                  <SelectItem value="$">CAD (Canadian Dollar)</SelectItem>
                  <SelectItem value="$">AUD (Australian Dollar)</SelectItem>
                  <SelectItem value="$">SGD (Singapore Dollar)</SelectItem>
                  <SelectItem value="¥">CNY (Chinese Renminbi)</SelectItem>
                  <SelectItem value="₿">BTC (Bitcoin)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="my-3">
              <Label className="font-bold">Tax rate:</Label>
              <div className="my-1 flex flex-nowrap">
                <Input
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={handleChange(setTaxRate)}
                  className="bg-white/[0.5] border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <Input
                  className="bg-white/[0.5] font-bold text-secondary text-sm"
                  placeholder={"%"}
                />
              </div>
            </div>
            <div className="my-3">
              <Label className="font-bold">Discount rate:</Label>
              <div className="my-1 flex-nowrap">
                <Input
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={handleChange(setDiscountRate)}
                  className="bg-white/[0.5] border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <Input
                  className="bg-white/[0.5] font-bold text-secondary text-small"
                  placeholder="%"
                />
              </div>
            </div>
            <hr className="mt-4 mb-3" />
            <Button
              variant="secondary"
              type="submit"
              className="block w-full"
            >
              Review Invoice
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
