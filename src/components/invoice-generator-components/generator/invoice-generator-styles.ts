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

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitles: {
    fontWeight: "bold",
  },
  headerDates: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  billingInfoSection: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  billToFrom: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
});

export const styleGen = {
  w: (pixels: number): Style => ({ width: pixels }),
  h: (pixels: number): Style => ({ height: pixels }),
  p: (pixels: number): Style => ({ padding: pixels }),
  px: (pixels: number): Style => ({
    paddingRight: pixels,
    paddingLeft: pixels,
  }),
  py: (pixels: number): Style => ({
    paddingTop: pixels,
    paddingBottom: pixels,
  }),
  pl: (pixels: number): Style => ({ paddingLeft: pixels }),
  pr: (pixels: number): Style => ({ paddingRight: pixels }),
  pt: (pixels: number): Style => ({ paddingTop: pixels }),
  pb: (pixels: number): Style => ({ paddingBottom: pixels }),
  m: (pixels: number): Style => ({ margin: pixels }),
  mx: (pixels: number): Style => ({ marginRight: pixels, marginLeft: pixels }),
  my: (pixels: number): Style => ({ marginTop: pixels, marginBottom: pixels }),
  mxAuto: (): Style => ({ marginLeft: "auto", marginRight: "auto" }),
  ml: (pixels: number): Style => ({ marginLeft: pixels }),
  mr: (pixels: number): Style => ({ marginRight: pixels }),
  mt: (pixels: number): Style => ({ marginTop: pixels }),
  mb: (pixels: number): Style => ({ marginBottom: pixels }),
  textCenter: (): Style => ({ textAlign: "center" }),
  textSize: (pixel: number): Style => ({ fontSize: pixel }),
  textColor: (color: string): Style => ({ color: color }),
  flex: (direction: "row" | "column" = "row"): Style => ({
    flexDirection: direction,
  }),
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
