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
  total: number;
  subTotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
};
