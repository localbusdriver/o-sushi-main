import { Input } from "@/components/ui/input";

const EditableField = ({
  cellData,
  onItemizedItemEdit,
}: {
  cellData: {
    type: string;
    name: string;
    placeholder?: string;
    value: string;
    id: string;
    leading?: string;
    min?: number;
    step?: string;
    textAlign?: string;
  };
  onItemizedItemEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  console.log(cellData);
  return (
    <div id="Editable-Field" className="my-1 flex-nowrap">
      {cellData.leading != null && (
        <div className="border-0 bg-white/[0.5] px-2 font-bold text-secondary">
          <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-secondary">
            {cellData.leading}
          </span>
        </div>
      )}
      <Input
        className={cellData.textAlign}
        type={cellData.type}
        placeholder={cellData.placeholder}
        min={cellData.min}
        name={cellData.name}
        id={cellData.id}
        value={cellData.value}
        step={cellData.step}
        aria-label={cellData.name}
        onChange={onItemizedItemEdit}
        required
      />
    </div>
  );
};

export default EditableField;
