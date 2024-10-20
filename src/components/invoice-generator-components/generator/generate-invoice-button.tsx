"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { InvoiceDataType } from "@/lib/types/invoice-generator-types";

const GenerateInvoice = ({
  paymentDetails,
  billingInfo,
  items,
  finalNumbers,
}: InvoiceDataType) => {
  const [isGenerating, setGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setGenerating(true);
    const PDFGenerator = (await import("./invoice-generator")).default;
    await PDFGenerator({ paymentDetails, billingInfo, items, finalNumbers });
    setGenerating(false);
  };

  return (
    <>
      <Button onClick={handleGeneratePDF} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Invoice"}
      </Button>
    </>
  );
};

export default GenerateInvoice;
