"use client";

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

// const GenerateInvoice = () => {
//   html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png", 1.0);
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "pt",
//       format: [612, 792],
//     });
//     pdf.internal.scaleFactor = 1;
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice-001.pdf");
//   });
// };

type InvoiceModalProps = {
  billingInfo: BillingInfoType;
  modifiers: PaymentDetailsType;
  final: TotalType;
  items: any[];
};

const InvoiceModal = ({
  billingInfo,
  modifiers,
  items,
  final,
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
      <DialogTrigger className="rounded border px-3 py-2 transition hover:border-accent hover:bg-primary-foreground">
        Finalise
      </DialogTrigger>
      <DialogContent>
        <div id="invoiceCapture">
          <div className="w-100 flex flex-row items-start justify-between bg-white/[0.5] p-4">
            <div className="w-100">
              <h4 className="my-2 font-bold">{billFrom || "Mikyung Wee"}</h4>
              <h6 className="mb-1 font-bold text-secondary">
                Invoice Number: {invoiceNumber || ""}
              </h6>
            </div>
            <div className="ms-4 text-end">
              <h6 className="mb-2 mt-1 font-bold">Amount&nbsp;Due:</h6>
              <h5 className="font-bold text-secondary">
                {" "}
                {currency} {total}
              </h5>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-4 flex flex-row">
              <div className="flex flex-col">
                <div className="font-bold">Billed From:</div>
                <div>{billFrom || ""}</div>
                <div>{billFromAddress || ""}</div>
                <div>{billFromEmail || ""}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Billed to:</div>
                <div>{billTo || ""}</div>
                <div>{billToAddress || ""}</div>
                <div>{billToEmail || ""}</div>
              </div>
              <div className="flex flex-col">
                <div className="mt-2 font-bold">Date Of Issue:</div>
                <div>{dateOfIssue || ""}</div>
              </div>
            </div>
            <table className="mb-0">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">PRICE</th>
                  <th className="text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  return (
                    <tr id={i.toString()} key={i}>
                      <td style={{ width: "70px" }}>{item.quantity}</td>
                      <td>
                        {item.name} - {item.description}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {currency} {item.price}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {currency} {item.price * item.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td className="font-bold" style={{ width: "100px" }}>
                    SUBTOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {subTotal}
                  </td>
                </tr>
                {taxAmount != 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="font-bold" style={{ width: "100px" }}>
                      TAX
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {currency} {taxAmount}
                    </td>
                  </tr>
                )}
                {discountAmount != 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="font-bold" style={{ width: "100px" }}>
                      DISCOUNT
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {currency} {discountAmount}
                    </td>
                  </tr>
                )}
                <tr className="text-end">
                  <td></td>
                  <td className="font-bold" style={{ width: "100px" }}>
                    TOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {total}
                  </td>
                </tr>
              </tbody>
            </table>
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
