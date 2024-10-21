import { Decimal } from "decimal.js";

import type {
    InvoiceDataType,
    TotalType,
} from "@/lib/types/invoice-generator-types";
import { formatDecimal } from "@/lib/utils";

const InvoicePDF = async ({
    paymentDetails,
    billingInfo,
    items,
    finalNumbers,
}: InvoiceDataType) => {
    const newFinal: { [key: string]: string } = {};
    Object.entries(finalNumbers).forEach(([key, value]) => {
        const formattedValue =
            value instanceof Decimal ? formatDecimal(value) : (value as number);
        newFinal[key] = formattedValue.toFixed(2);
    });

    const { Document, Font, Page, Text, View, Line, Svg, Image } = await import(
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
                <View
                    style={[
                        styleGen.flex("row"),
                        styleGen.justify("space-between"),
                        styleGen.mb(20),
                    ]}
                    id="header"
                >
                    <View
                        style={[styleGen.flex("column"), styleGen.gap(4)]}
                        id="dates"
                    >
                        <Text>
                            <Text style={styles.fwBold}>Current Date:</Text>
                            &nbsp;
                            {currentDate.toLocaleDateString()}
                        </Text>
                        <Text>
                            <Text style={styles.fwBold}>Due Date:</Text>&nbsp;
                            {paymentDetails.dateOfIssue ||
                                currentDate.toLocaleDateString()}
                        </Text>
                    </View>
                    <Text id="invoice-number">
                        <Text style={styles.fwBold}>Invoice No.&nbsp;</Text>
                        {paymentDetails.invoiceNumber}
                    </Text>
                </View>
                <View
                    id="billing-info"
                    style={[
                        styleGen.flex("row"),
                        styleGen.gap(15),
                        styleGen.mb(20),
                    ]}
                >
                    <View id="bill-from" style={[styleGen.flex("column")]}>
                        <Text style={[styles.textPrimary, styles.fwBold]}>
                            Bill From:
                        </Text>
                        <Text>{billingInfo.billFrom}</Text>
                        <Text>{billingInfo.billFromEmail}</Text>
                        <Text>{billingInfo.billFromAddress}</Text>
                    </View>
                    <View id="bill-to" style={[styleGen.flex("column")]}>
                        <Text style={[styles.textPrimary, styles.fwBold]}>
                            Bill To:
                        </Text>
                        <Text>{billingInfo.billTo}</Text>
                        <Text>{billingInfo.billToEmail}</Text>
                        <Text>{billingInfo.billToAddress}</Text>
                    </View>
                </View>
                <Svg height="1" width="520">
                    <Line
                        x1="0"
                        y1="0"
                        x2="520"
                        y2="0"
                        strokeWidth={0.25}
                        stroke="rgb(0,0,0)"
                    />
                </Svg>
                <View
                    style={[
                        styleGen.flex("column"),
                        styleGen.gap(4),
                        styleGen.mt(20),
                        styleGen.mb(20),
                    ]}
                >
                    <View
                        style={[
                            styleGen.flex("row"),
                            styles.textLarge,
                            styleGen.w("520px"),
                        ]}
                    >
                        <Text
                            style={[
                                styles.fwBold,
                                styles.textPrimary,
                                styleGen.w("260px"),
                                styleGen.px(0),
                            ]}
                        >
                            ITEM
                        </Text>
                        <View
                            style={[
                                styleGen.flex("row"),
                                styleGen.justify("flex-end"),
                                styles.textLarge,
                            ]}
                        >
                            <View style={styleGen.w("130px")}>
                                <Text
                                    style={[
                                        styles.fwBold,
                                        styles.textPrimary,
                                        styleGen.textAlign("right"),
                                        styleGen.px(0),
                                    ]}
                                >
                                    QUANTITY
                                </Text>
                            </View>
                            <View style={styleGen.w("130px")}>
                                <Text
                                    style={[
                                        styles.fwBold,
                                        styles.textPrimary,
                                        styleGen.textAlign("right"),
                                        styleGen.px(0),
                                    ]}
                                >
                                    PRICE
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    id="body"
                    style={[
                        styleGen.flex("column"),
                        styleGen.gap(6),
                        styleGen.w("520px"),
                    ]}
                >
                    {items.map((item, index) => (
                        <View key={item.id + index}>
                            <View
                                style={[styleGen.flex("row"), styles.textMed]}
                            >
                                <Text style={styleGen.w("260px")}>
                                    {item.name}
                                </Text>
                                <View style={[styleGen.flex("row")]}>
                                    <View style={styleGen.w("130px")}>
                                        <Text
                                            style={styleGen.textAlign("right")}
                                        >
                                            {item.quantity.toFixed(0)}
                                        </Text>
                                    </View>
                                    <View style={styleGen.w("130px")}>
                                        <Text
                                            style={styleGen.textAlign("right")}
                                        >
                                            ${Number(item.price).toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {item.description && (
                                <Text
                                    style={[
                                        styleGen.w("85vw"),
                                        styles.textLightGray,
                                    ]}
                                >
                                    {item.description}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>

                <View
                    style={[
                        styleGen.flex(),
                        styleGen.justify("flex-end"),
                        styleGen.gap(20),
                        styleGen.my(20),
                    ]}
                >
                    <View>
                        <Text style={styles.fwBold}>Subtotal:</Text>
                        {Number(newFinal.discountRate) > 0 && (
                            <Text style={styles.fwBold}>
                                Discount:&nbsp;&nbsp;
                                <Text style={styles.fwNormal}>
                                    &#40;{newFinal.discountRate}&#37;&#41;
                                </Text>
                            </Text>
                        )}
                        <Text style={styles.fwBold}>
                            Tax:&nbsp;&nbsp;
                            <Text style={styles.fwNormal}>
                                &#40;{newFinal.taxRate}&#37;&#41;
                            </Text>
                        </Text>
                        <Text style={[styles.fwBold, styles.textMed]}>
                            Total:
                        </Text>
                    </View>
                    <View>
                        <Text>${newFinal.subTotal}</Text>
                        {Number(newFinal.discountRate) > 0 && (
                            <Text>${newFinal.discountAmount}</Text>
                        )}
                        <Text>${newFinal.taxAmount}</Text>
                        <Text style={styles.textMed}>${newFinal.total}</Text>
                    </View>
                </View>
                <Svg height="1" width="520">
                    <Line
                        x1="0"
                        y1="0"
                        x2="520"
                        y2="0"
                        strokeWidth={0.25}
                        stroke="rgb(0,0,0)"
                    />
                </Svg>
                <View style={styleGen.mt(20)} id="footer">
                    {paymentDetails.notes && (
                        <>
                            <Text style={[styles.fwBold, styleGen.mb(6)]}>
                                Notes:
                            </Text>
                            <Text style={styles.textLightGray}>
                                {paymentDetails.notes}
                            </Text>
                        </>
                    )}
                    <Text style={[styles.textLightGray, styleGen.mb(6)]}>
                        Sent from O&#39;Sushi
                    </Text>
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

    if (!billingInfo.billFrom) {
        billingInfo.billFrom = "O'Sushi";
        billingInfo.billFromEmail = "info@o-sushi.co";
        billingInfo.billFromAddress =
            "6 Riddiford Street, Newtown, Wellington, 6021";
    }
    const blob = await pdf(
        await InvoicePDF({ paymentDetails, billingInfo, items, finalNumbers })
    ).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    // setTimeout(() => URL.revokeObjectURL(url), 100);
};

export default PDFGenerator;
