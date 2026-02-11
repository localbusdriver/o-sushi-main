import { StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

export const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        fontSize: 11,
        lineHeight: 1.5,
        flexDirection: "column" as const,
        padding: "40px",
    },
    logo: {
        width: "100px",
        height: "100px",
        zIndex: 1,
        objectFit: "contain",
    },
    fwBold: {
        fontWeight: "heavy",
    },
    textPrimary: {
        color: "hsl(223 60% 20%)",
    },
    fwNormal: {
        fontWeight: 400,
    },
    textLightGray: {
        color: "#88888b",
    },
    textMed: {
        fontSize: "12px",
    },
    textLarge: {
        fontSize: "14px",
    },
    borderB: {
        border: "1px solid #000",
    },
    footer: {
        backgroundColor: "#f0f0f0",
        position: "absolute",
        bottom: "100px",
        left: 10,
    },
});

export const styleGen = {
    w: (pixels: number | string): Style => ({ width: pixels }),
    h: (pixels: number | string): Style => ({ height: pixels }),
    p: (pixels: number | string): Style => ({ padding: pixels }),
    px: (pixels: number): Style => ({
        paddingRight: pixels,
        paddingLeft: pixels,
    }),
    py: (pixels: number): Style => ({
        paddingTop: pixels,
        paddingBottom: pixels,
    }),
    m: (pixels: number): Style => ({ margin: pixels }),
    mx: (pixels: number | string): Style => ({
        marginRight: pixels,
        marginLeft: pixels,
    }),
    my: (pixels: number): Style => ({
        marginTop: pixels,
        marginBottom: pixels,
    }),
    mt: (pixels: number): Style => ({ marginTop: pixels }),
    mb: (pixels: number): Style => ({ marginBottom: pixels }),
    textAlign: (align: "center" | "left" | "right" | "justify"): Style => ({
        textAlign: align,
    }),
    textSize: (pixel: number): Style => ({ fontSize: pixel }),
    textColor: (color: string): Style => ({ color: color }),
    flex: (direction: "row" | "column" = "row"): Style => ({
        display: "flex",
        flexDirection: direction,
    }),
    gap: (pixels: number): Style => ({ gap: pixels }),
    justify: (
        justify:
            | "flex-start"
            | "flex-end"
            | "center"
            | "space-around"
            | "space-between"
            | "space-evenly"
            | undefined
    ): Style => ({
        justifyContent: justify,
    }),
    align: (
        align:
            | "flex-start"
            | "flex-end"
            | "center"
            | "stretch"
            | "baseline"
            | undefined
    ): Style => ({
        alignItems: align,
    }),
};
