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
        <div className="bg-white/[0.5] font-bold border-0 text-secondary px-2">
          <span className="border-2 border-secondary rounded-full flex items-center justify-center w-[20px] h-[20px]">
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
