import { Decimal } from "decimal.js";

export type Item = {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
};

// modifiers
export type PaymentDetailsType = {
  currency: string;
  invoiceNumber: number;
  dateOfIssue: string;
  notes: string;
};

// billing info
export type BillingInfoType = {
  billTo: string;
  billToEmail: string;
  billToAddress: string;
  billFrom: string;
  billFromEmail: string;
  billFromAddress: string;
};

// final
export type TotalType = {
  total: Decimal;
  subTotal: Decimal;
  taxRate: Decimal;
  taxAmount: Decimal;
  discountRate: Decimal;
  discountAmount: Decimal;
};

export type InvoiceDataType = {
  paymentDetails: PaymentDetailsType;
  billingInfo: BillingInfoType;
  items: Item[];
  finalNumbers: TotalType;
};
