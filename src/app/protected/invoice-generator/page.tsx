import InvoiceForm from "./components/InvoiceForm";

const Page = () => {
  return <InvoiceForm currentDate={new Date().toLocaleDateString("en-GB")} />;
};

export default Page;
