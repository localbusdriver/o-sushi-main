import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import EditableField from "./editable-field";

type InvoiceItemProps = {
  items: any[];
  onItemizedItemEdit: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  currency: string;
  onRowDel: (item: any) => void;
  onRowAdd: () => void;
};
const InvoiceItem = ({
  items,
  onItemizedItemEdit,
  currency,
  onRowDel,
  onRowAdd,
}: InvoiceItemProps) => {
  return (
    <div id="Invoice-Item">
      <table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onItemizedItemEdit={onItemizedItemEdit}
              onDelEvent={onRowDel}
              currency={currency}
            />
          ))}
        </tbody>
      </table>
      <Button variant="secondary" className="font-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

type ItemRowProps = {
  item: any;
  onItemizedItemEdit: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  currency: string;
  onDelEvent: (item: any) => void;
};

const ItemRow = ({
  item,
  onItemizedItemEdit,
  onDelEvent,
  currency,
}: ItemRowProps) => {
  const handleDelete = () => {
    onDelEvent(item);
  };

  return (
    <tr className="items-center">
      <td className="w-full">
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
          }}
        />
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            textAlign: "text-end",
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <Trash2
          onClick={handleDelete}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="mt-1 cursor-pointer rounded bg-red-500 text-white"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
