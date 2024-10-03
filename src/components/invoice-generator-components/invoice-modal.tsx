"use client";

import { Decimal } from "decimal.js";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { jsPDF } from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BillingInfoType,
  PaymentDetailsType,
  TotalType,
} from "@/lib/types/invoice-generator-types";
import { formatDecimal } from "@/lib/utils";
import { cn } from "@/lib/utils";

const GenerateInvoice = () => {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
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
    pdf.save("invoice-001.pdf");
  });
};

type InvoiceModalProps = {
  billingInfo: BillingInfoType;
  modifiers: PaymentDetailsType;
  final: TotalType;
  items: any[];
  className: string;
};

const InvoiceModal = ({
  billingInfo,
  modifiers,
  items,
  final,
  className,
}: InvoiceModalProps) => {
  const { currency, invoiceNumber, dateOfIssue, notes } = modifiers;
  const {
    billFrom,
    billFromAddress,
    billFromEmail,
    billTo,
    billToAddress,
    billToEmail,
  } = billingInfo;
  const { total, subTotal, taxAmount, discountAmount } = final;

  return (
    <Dialog>
      <DialogTrigger className={cn("", className)}>Finalise</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <div id="invoiceCapture">
          <div
            className="flex flex-row items-start justify-between bg-white/[0.5] p-4"
            id="invoice information"
          >
            <div className="">
              <h4 className="my-2 font-bold">{billFrom || "JPMK Ltd"}</h4>
              <h6 className="mb-1 font-bold">
                Invoice Number: {invoiceNumber || ""}
              </h6>
              <div className="flex flex-row gap-2">
                <h6>
                  {" "}
                  <span className="mt-2 font-bold">Date Of Issue:</span>&nbsp;
                  <span className="">
                    {dateOfIssue || new Date().toLocaleDateString()}
                  </span>
                </h6>
              </div>
            </div>
            <div className="ms-4 inline-flex flex-row items-center gap-2 text-end">
              <h6 className="font-bold">
                <span>Amount&nbsp;Due:</span>&nbsp;
                <span>
                  {currency}
                  {formatDecimal(total)}
                </span>
              </h6>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-4 flex flex-row flex-wrap gap-10" id="billing">
              <div className="flex flex-col">
                <div className="font-bold">Billed From:</div>
                <div>{billFrom || "Mikyung Wee"}</div>
                <div>{billFromAddress || "100 Rithiford Street, Newtown"}</div>
                <div>{billFromEmail || "weemikyung@hotmail.com"}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Billed to:</div>
                <div>{billTo || "John Doe"}</div>
                <div>{billToAddress || "100 Example Address, Suburb"}</div>
                <div>{billToEmail || "example@example.com"}</div>
              </div>
            </div>

            <div className="mb-0 mt-4 grid grid-cols-12 gap-y-2" id="table">
              <div className="col-span-12 row-span-1 grid grid-cols-12 font-bold">
                <div className="col-span-1 w-16 text-center">
                  <h3>QTY</h3>
                </div>
                <div className="col-span-7">
                  <h3>DESCRIPTION</h3>
                </div>
                <div className="col-span-2 w-20 text-end">
                  <h3>PRICE</h3>
                </div>
                <div className="col-span-2 text-end">
                  <h3>AMOUNT</h3>
                </div>
              </div>

              {items.map((item, i) => {
                return (
                  <div
                    id={i.toString()}
                    key={i}
                    className="col-span-12 row-span-1 grid grid-cols-12"
                  >
                    <div className="col-span-1 w-16 text-center">
                      <p>{item.quantity}</p>
                    </div>
                    <div className="col-span-7">
                      <p>
                        {item.name} - {item.description}
                      </p>
                    </div>
                    <div className="col-span-2 w-20 text-end">
                      <p>
                        {currency} {item.price}
                      </p>
                    </div>
                    <div className="col-span-2 text-end">
                      <p>
                        {currency} {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 space-y-2">
              <div>
                <div className="text-end">
                  <td></td>
                  <td className="font-bold" style={{ width: "100px" }}>
                    SUBTOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {formatDecimal(subTotal)}
                  </td>
                </div>
                {formatDecimal(taxAmount) != 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="font-bold" style={{ width: "100px" }}>
                      TAX
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {currency} {formatDecimal(taxAmount)}
                    </td>
                  </tr>
                )}
                {formatDecimal(discountAmount) != 0.0 && (
                  <div className="text-end">
                    <td></td>
                    <td className="font-bold" style={{ width: "100px" }}>
                      DISCOUNT
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {currency} {formatDecimal(discountAmount)}
                    </td>
                  </div>
                )}
                <div className="text-end">
                  <td></td>
                  <td className="font-bold" style={{ width: "100px" }}>
                    TOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {formatDecimal(total)}
                  </td>
                </div>
              </div>
            </div>
            {notes && (
              <div className="rounded bg-white/[0.5] px-4 py-3">{notes}</div>
            )}
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="flex flex-row">
            <div className="flex flex-col"></div>
            <div className="flex flex-col">
              <Button
                variant="outline"
                className="mt-3 flex max-w-max flex-row items-center justify-center md:mt-0"
                // onClick={GenerateInvoice}
              >
                <Download
                  style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                  className="me-2"
                />
                Download Copy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
