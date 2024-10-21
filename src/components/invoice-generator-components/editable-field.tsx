import React from "react";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

type CellDataType = {
    type: string;
    name: string;
    placeholder?: string;
    value: string;
    id: string;
    leading?: string;
    min?: number;
    step?: number;
    textAlign?: string;
};

function EditableField({
    cellData,
    onItemizedItemEdit,
    className,
}: {
    cellData: CellDataType;
    className?: string;
    onItemizedItemEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div
            id="Editable-Field"
            className={cn("my-1 flex flex-nowrap items-center", className)}
        >
            {cellData.leading != null && (
                <div className="flex h-10 items-center rounded rounded-r-none border border-r-0 bg-white/[0.5] px-2 font-bold text-secondary">
                    <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full border border-secondary-foreground/[0.5] text-secondary-foreground/[0.5]">
                        {cellData.leading}
                    </span>
                </div>
            )}
            <Input
                className={cn(
                    cellData.textAlign,
                    cellData.name === "price" && "rounded-l-none"
                )}
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
}

export default React.memo(EditableField);
