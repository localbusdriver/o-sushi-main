import React from "react";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Item } from "@/lib/types/invoice-generator-types";

import EditableField from "./editable-field";

type InvoiceItemProps = {
  items: Item[];
  onItemizedItemEdit: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onRowDel: (item: any) => void;
  onRowAdd: () => void;
};

function InvoiceItem({
  items,
  onItemizedItemEdit,
  onRowDel,
  onRowAdd,
}: InvoiceItemProps) {
  return (
    <div id="Invoice-Item" className="sm:max-w-[747px]">
      <div className="grid grid-cols-11 gap-y-2">
        <div className="col-span-12 row-span-1 grid grid-cols-12 gap-x-2 font-bold">
          <h3 className="col-span-6">ITEM</h3>
          <h3 className="col-span-2">QTY</h3>
          <h3 className="col-span-2">PRICE/RATE</h3>
        </div>

        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onItemizedItemEdit={onItemizedItemEdit}
            onDelEvent={onRowDel}
          />
        ))}
      </div>
      <Button variant="secondary" className="mt-4 font-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
}

type ItemRowProps = {
  item: any;
  onItemizedItemEdit: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onDelEvent: (item: any) => void;
};

function ItemRow({ item, onItemizedItemEdit, onDelEvent }: ItemRowProps) {
  const handleDelete = React.useCallback(() => {
    onDelEvent(item);
  }, [item, onDelEvent]);

  return (
    <>
      <div className="col-span-12 grid grid-cols-12 items-center gap-2">
        <div className="col-span-6">
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "name",
              placeholder: "Item name",
              value: item.name.toString(),
              id: item.id,
            }}
          />
        </div>
        <div className="col-span-2">
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: 1,
              value: item.quantity.toString(),
              id: item.id,
            }}
          />
        </div>
        <div className="col-span-2">
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              leading: "$",
              type: "number",
              name: "price",
              step: 0.1,
              textAlign: "text-end",
              value: item.price.toString(),
              id: item.id,
            }}
          />
        </div>
        <div className="col-span-2">
          <Trash2
            onClick={handleDelete}
            className="mx-auto mb-1 size-[33px] cursor-pointer rounded bg-red-500 p-[7.5px] text-white"
          />
        </div>
      </div>
      <div className="col-span-6 border-b-2 pb-2 pr-1">
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description.toString(),
            id: item.id,
          }}
        />
      </div>
    </>
  );
}

export default InvoiceItem;
