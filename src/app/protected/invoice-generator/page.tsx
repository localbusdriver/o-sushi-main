import InvoiceForm from "@/components/invoice-generator-components/invoice-form";

const Page = () => {
  return <InvoiceForm currentDate={new Date().toLocaleDateString("en-GB")} />;
};

export default Page;
