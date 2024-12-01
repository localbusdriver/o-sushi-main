"use client";

import * as React from "react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export function DatePickerWithPresets({
    date,
    setDate,
    children,
}: {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    children?: React.ReactNode;
}) {
    const handleSelect = (day: Date | undefined) => {
        if (day) {
            setDate(day);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                {children}
                <div className="rounded-md border">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}
