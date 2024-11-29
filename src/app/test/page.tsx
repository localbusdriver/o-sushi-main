"use client";

import { Span } from "next/dist/trace";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DatePickerWithPresets } from "@/components/ui/date-picker-children";

import {
    DoublesTable,
    SummaryTable,
} from "@/components/school-summary-components/summary-table";

import type {
    DoublesType,
    SummaryType,
} from "@/lib/types/school-summary-types";
import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

const Page = () => {
    const { toast } = useToast();
    const [session, setSession] = useState<string | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<{ target: string } | null>(null);
    const [orders, setOrders] = useState<SummaryType | null>(null);
    const [doubles, setDoubles] = useState<DoublesType | null>(null);

    useEffect(() => {
        console.log(date);
    }, [date]);

    const getSessions = async () => {
        setLoading({ target: "sessions" });
        const response = await fetch("/api/kindo/get-session", {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        });
        if (!response.ok) {
            setLoading(null);
            toast({
                variant: "destructive",
                title: "Failed to fetch sessions",
            });
            return;
        }
        const data = await response.json();
        setSession(data);
        setLoading(null);
        toast({
            title: "[sessions: 200]",
            description: "Fetched sessions successfully",
        });
    };

    const getOrders = async () => {
        if (!session) {
            toast({
                variant: "destructive",
                title: "Session is required",
            });
            return;
        }
        if (!date) {
            toast({
                variant: "destructive",
                title: "Date is required",
            });
        }
        setLoading({ target: "orders" });
        const targetDate = date?.toLocaleDateString("en-CA");
        console.log(targetDate);

        const response = await fetch("/api/kindo/get-orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
            body: JSON.stringify({ targetDate: targetDate, cookies: session }),
        });

        if (!response.ok) {
            setLoading(null);
            toast({
                variant: "destructive",
                title: "Failed to fetch orders",
            });
            return;
        }
        const data = await response.json();
        setOrders(data);
        setLoading(null);
        toast({
            title: "[orders: 200]",
            description: "Fetched orders successfully",
        });
    };

    const getDoubles = async () => {
        if (!session) {
            toast({
                variant: "destructive",
                title: "Session is required",
            });
            return;
        }
        if (!date) {
            toast({
                variant: "destructive",
                title: "Date is required",
            });
        }
        setLoading({ target: "doubles" });
        const targetDate = date?.toLocaleDateString("en-CA");

        console.log(targetDate);
        const response = await fetch("/api/kindo/get-doubles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
            body: JSON.stringify({ targetDate: targetDate, cookies: session }),
        });

        if (!response.ok) {
            toast({
                variant: "destructive",
                title: "Failed to fetch doubles",
            });
            return;
        }
        const data = await response.json();
        console.log(data);
        setDoubles(data);
        setLoading(null);
        toast({
            title: "[doubles: 200]",
            description: "Fetched doubles successfully",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-4 rounded-lg bg-slate-400 px-6 py-3 shadow-md">
                <Button
                    onClick={getSessions}
                    disabled={session !== null || loading !== null}
                >
                    Login
                </Button>
                <Button
                    variant="secondary"
                    onClick={getOrders}
                    disabled={session === null || loading !== null}
                >
                    Get Orders
                </Button>
                <Button
                    variant="secondary"
                    onClick={getDoubles}
                    disabled={session === null || loading !== null}
                >
                    Get Doubles
                </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
                <DatePickerWithPresets date={date} setDate={setDate}>
                    <Button className="" onClick={() => setDate(new Date())}>
                        Today
                    </Button>
                </DatePickerWithPresets>
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            "size-2 rounded-full",
                            session ? "bg-green-500" : "bg-red-500"
                        )}
                    />
                    <span>
                        {(session && `${session.slice(29, 39)}`) ||
                            "No session"}
                        ...
                    </span>
                </div>
            </div>
            <div className="flex justify-center gap-8 rounded-lg bg-slate-400 p-4 shadow-lg">
                <div className="flex h-[500px] w-[400px] items-center justify-center rounded-lg bg-white px-4 py-3">
                    {loading?.target === "orders" ? (
                        <span className="text-xl font-bold">
                            Loading orders...
                        </span>
                    ) : (
                        <SummaryTable results={orders} />
                    )}
                </div>
                <div
                    className={cn(
                        "h-[500px] w-[850px] rounded-lg bg-white px-4 py-3",
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
