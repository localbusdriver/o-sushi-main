"use client";

//src\app\protected\school-summary\page.tsx
import { useEffect, useState } from "react";

import {
    Calendar,
    Copy,
    ExternalLink,
    FileText,
    LogIn,
    LogOut,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
// import { DatePickerWithPresets } from "@/components/ui/date-picker-children";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    DoublesTable,
    SummaryTable,
} from "@/components/school-summary-components/summary-table";

import type {
    DoublesType,
    SummaryType,
} from "@/lib/types/school-summary-types";
import { cn } from "@/lib/utils";

interface LoadingState {
    target: "sessions" | "orders" | "doubles" | null;
}

const ActionButton = ({
    onClick,
    disabled,
    variant = "secondary",
    icon,
    label,
    tooltip,
    className,
}: {
    onClick: () => void;
    disabled: boolean;
    variant?: "default" | "secondary" | "outline";
    icon: React.ReactNode;
    label: string;
    tooltip: string;
    className?: string;
}) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={variant}
                    size="lg"
                    onClick={onClick}
                    disabled={disabled}
                    className={cn("w-full sm:w-35", className)}
                >
                    {icon}
                    {label}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const SessionStatus = ({ session }: { session: string | null }) => (
    <div className="flex h-11 items-center gap-2 rounded-md bg-white px-4">
        <div
            className={cn(
                "size-2 rounded-full",
                session ? "bg-green-500" : "bg-red-500"
            )}
        />
        <span className="text-sm text-gray-600">
            {(session && `${session.slice(0, 10)}...`) || "No session"}
        </span>
    </div>
);

const ExternalLinkButton = ({
    href,
    disabled,
    icon,
    label,
    tooltip,
}: {
    href: string;
    disabled: boolean;
    icon: React.ReactNode;
    label: string;
    tooltip: string;
}) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        disabled={disabled}
                        className="w-full sm:w-35"
                    >
                        {icon}
                        {label}
                    </Button>
                </a>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const Page = () => {
    const [session, setSession] = useState<string | null>(() => {
        if (typeof localStorage === undefined) {
            return null;
        }
        return localStorage.getItem("session") ?? null;
    });
    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<LoadingState | null>(null);
    const [orders, setOrders] = useState<SummaryType | null>(null);
    const [doubles, setDoubles] = useState<DoublesType | null>(null);

    useEffect(() => {
        if (session) {
            localStorage.removeItem("session");
            localStorage.setItem("session", session);
        }
    }, [session]);

    const getSessions = async () => {
        setLoading({ target: "sessions" });
        try {
            const response = await fetch("/api/kindo/get-session", {
                method: "GET",
                headers: {
                    "Cache-Control": "no-cache",
                    "x-timestamp": new Date().getTime().toString(),
                    Pragma: "no-cache",
                },
                next: {
                    revalidate: 0,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch sessions");

            const data = await response.json();

            localStorage.removeItem("session");
            localStorage.setItem("session", data);

            setSession(data);
            toast.success("Fetched sessions successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch sessions");
        } finally {
            setLoading(null);
        }
    };

    const getOrders = async () => {
        // if (!validateSessionAndDate()) return;

        setLoading({ target: "orders" });
        try {
            const targetDate = date.toLocaleDateString("en-CA");
            const response = await fetch("/api/kindo/get-orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    "x-timestamp": new Date().getTime().toString(),
                },
                body: JSON.stringify({ targetDate, cookies: session }),
                next: {
                    revalidate: 0,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch orders");

            const data = await response.json();
            setOrders(data);
            toast.success("Fetched orders successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(null);
        }
    };

    const getDoubles = async () => {
        if (!validateSessionAndDate()) return;

        setLoading({ target: "doubles" });
        try {
            const targetDate = date.toLocaleDateString("en-CA");
            const response = await fetch("/api/kindo/get-doubles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    "x-timestamp": new Date().getTime().toString(),
                },
                body: JSON.stringify({ targetDate, cookies: session }),
                cache: "no-store",
                next: {
                    revalidate: 0,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch doubles");

            const data = await response.json();
            setDoubles(data);
            toast.success("Fetched Double orders successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch doubles");
        } finally {
            setLoading(null);
        }
    };

    const validateSessionAndDate = () => {
        if (!session) {
            toast.error("Session is required");
            return false;
        }
        if (!date) {
            toast.error("Date is required");
            return false;
        }
        return true;
    };

    // Generate Kindo labels URL
    // https://shop.kindo.co.nz/shop/supplier.shtml?supplier=osushi&date=2025-02-13&task=label_pdf_sop_3x11
    const kindoLabelsUrl = `https://shop.kindo.co.nz/shop/supplier.shtml?supplier=osushi&date=${date.toLocaleDateString("en-CA")}&task=label_pdf_sop_3x11`;

    const handleClearSession = () => {
        localStorage.removeItem("session");
        setSession(null);
        toast.info("Session cleared successfully");
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 rounded-lg bg-zinc-100 p-6 shadow-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
                        <ActionButton
                            onClick={getSessions}
                            disabled={session !== null || loading !== null}
                            variant="default"
                            icon={<LogIn className="mr-2 h-4 w-4" />}
                            label="Get session"
                            tooltip="Login to Kindo to access order data"
                        />
                        <ActionButton
                            onClick={handleClearSession}
                            disabled={session === null}
                            icon={<LogOut className="mr-2 h-4 w-4" />}
                            label="Clear Session"
                            tooltip="Clear session"
                        />
                        <SessionStatus session={session} />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <DatePickerWithPresets date={date} setDate={setDate}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-[140px]"
                                onClick={() => setDate(new Date())}
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Today
                            </Button>
                        </DatePickerWithPresets> */}
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start">
                    <ActionButton
                        onClick={getOrders}
                        disabled={session === null || loading !== null}
                        icon={<FileText className="mr-2 h-4 w-4" />}
                        label="Orders"
                        tooltip="Fetch order summary for selected date"
                        className="bg-blue-500 text-white hover:bg-blue-400"
                    />

                    <ActionButton
                        onClick={getDoubles}
                        disabled={false}
                        // disabled={session === null || loading !== null}
                        icon={<Copy className="mr-2 h-4 w-4" />}
                        label="Doubles"
                        tooltip="Check for duplicate orders"
                        className="bg-blue-500 text-white hover:bg-blue-400"
                    />

                    <ExternalLinkButton
                        href={kindoLabelsUrl}
                        disabled={session === null || loading !== null}
                        icon={<ExternalLink className="mr-2 h-4 w-4" />}
                        label="Labels"
                        tooltip="Open Kindo labels in new tab"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:justify-center">
                <div className="h-125 w-full rounded-lg bg-white px-4 py-3 shadow-lg lg:w-100">
                    {loading?.target === "orders" ? (
                        <div className="flex h-full items-center justify-center">
                            <span className="text-xl font-bold">
                                Loading orders...
                            </span>
                        </div>
                    ) : (
                        <SummaryTable results={orders} />
                    )}
                </div>
                <div
                    className={cn(
                        "h-125 w-full rounded-lg bg-white px-4 py-3 shadow-lg lg:w-212.5",
                        loading?.target === "doubles" &&
                            "flex items-center justify-center"
                    )}
                >
                    {loading?.target === "doubles" ? (
                        <span className="text-xl font-bold">
                            Loading Doubles...
                        </span>
                    ) : (
                        <DoublesTable results={doubles} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
