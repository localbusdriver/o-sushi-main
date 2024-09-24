"use client";
import { PaymentDetailsType, BillingInfoType, TotalType } from "../types/type";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
      <DialogTrigger className="border px-3 py-2 rounded hover:bg-primary-foreground hover:border-accent transition">Finalise</DialogTrigger>
      <DialogContent>
        <div id="invoiceCapture">
          <div className="flex flex-row justify-between items-start bg-white/[0.5] w-100 p-4">
            <div className="w-100">
              <h4 className="font-bold my-2">{billFrom || "Mikyung Wee"}</h4>
              <h6 className="font-bold text-secondary mb-1">
                Invoice Number: {invoiceNumber || ""}
              </h6>
            </div>
            <div className="text-end ms-4">
              <h6 className="font-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
              <h5 className="font-bold text-secondary">
                {" "}
                {currency} {total}
              </h5>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-row mb-4">
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
                <div className="font-bold mt-2">Date Of Issue:</div>
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
              <div className="bg-white/[0.5] py-3 px-4 rounded">{notes}</div>
            )}
          </div>
        </div>
        <div className="pb-4 px-4">
          <div className="flex flex-row">
            <div className="flex flex-col"></div>
            <div className="flex flex-col">
              <Button
                variant="outline"
                className="flex flex-row items-center justify-center mt-3 md:mt-0 max-w-max "
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
