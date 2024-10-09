import { saveAs } from "file-saver";

import type { InvoiceDataType } from "@/lib/types/invoice-generator-types";

const InvoicePDF = async ({
  paymentDetails,
  billingInfo,
  items,
  finalNumbers,
}: InvoiceDataType) => {
  const { Document, Font, Page, Text, View } = await import(
    "@react-pdf/renderer"
  );
  const { styleGen, styles } = await import("./invoice-generator-styles");

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
        fontWeight: 300,
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
        fontWeight: 400,
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
        fontWeight: 500,
      },
    ],
  });

  const currentDate = new Date();
  return (
    <Document
      title={`${paymentDetails.invoiceNumber}-${billingInfo.billTo || "nameless"}-${currentDate.toISOString().slice(0, 10)}`}
      author="O'Sushi"
      subject="Invoice"
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header} id="header">
          <View style={styles.headerDates} id="dates">
            <Text>
              <Text style={styles.headerTitles}>Current Date:</Text>&nbsp;
              {currentDate.toLocaleDateString()}
            </Text>
            <Text>
              <Text style={styles.headerTitles}>Due Date:</Text>&nbsp;
              {paymentDetails.dateOfIssue || currentDate.toLocaleDateString()}
            </Text>
          </View>
          <Text id="invoice-number">
            Invoice Number:&nbsp;{paymentDetails.invoiceNumber}
          </Text>
        </View>
        <View id="billing-info" style={styles.billingInfoSection}>
          <View id="bill-from" style={styles.billToFrom}>
            <Text style={{ fontWeight: "bold" }}>Bill From:</Text>
            <Text>{billingInfo.billFrom}</Text>
            <Text>{billingInfo.billFromEmail}</Text>
            <Text>{billingInfo.billFromAddress}</Text>
          </View>
          <View id="bill-to" style={styles.billToFrom}>
            <Text style={{ fontWeight: "bold" }}>Bill To:</Text>
            <Text>{billingInfo.billTo}</Text>
            <Text>{billingInfo.billToEmail}</Text>
            <Text>{billingInfo.billToAddress}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const PDFGenerator = async ({
  paymentDetails,
  billingInfo,
  items,
  finalNumbers,
}: InvoiceDataType) => {
  const { pdf } = await import("@react-pdf/renderer");

  const blob = await pdf(
    await InvoicePDF({ paymentDetails, billingInfo, items, finalNumbers })
  ).toBlob();
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  // setTimeout(() => URL.revokeObjectURL(url), 100);
};

export default PDFGenerator;
