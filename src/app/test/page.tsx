"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

const Page = () => {
    const { toast } = useToast();
    const [session, setSession] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(new Date());
    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState({});
    const [doubles, setDoubles] = useState([]);

    const getSessions = async () => {
        const response = await fetch("/api/kindo/get-session", {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        });
        if (!response.ok) {
            toast({
                variant: "destructive",
                title: "Failed to fetch sessions",
            });
            return;
        }
        const data = await response.json();
        console.log(data);
        setSession(data);
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

        const targetDate = date?.toISOString().split("T")[0];
        console.log(targetDate);

        const response = await fetch("/api/kindo/get-orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
            body: JSON.stringify({ targetDate: date, cookies: session }),
        });

        if (!response.ok) {
            toast({
                variant: "destructive",
                title: "Failed to fetch orders",
            });
            return;
        }
        const data = await response.json();
        setOrders(data);
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

        const response = await fetch("/api/kindo/get-doubles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
            body: JSON.stringify({ targetDate: date, cookies: session }),
        });

        if (!response.ok) {
            toast({
                variant: "destructive",
                title: "Failed to fetch doubles",
            });
            return;
        }
        const data = await response.json();
        setDoubles(data);
        toast({
            title: "[doubles: 200]",
            description: "Fetched doubles successfully",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-4 rounded-lg bg-slate-400 px-6 py-3 shadow-md">
                <Button onClick={getSessions} disabled={session !== null}>
                    Login
                </Button>
                <Button
                    variant="secondary"
                    onClick={getOrders}
                    disabled={session === null}
                >
                    Get Orders
                </Button>
                <Button
                    variant="secondary"
                    onClick={getDoubles}
                    disabled={session === null}
                >
                    Get Doubles
                </Button>
            </div>

            <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            "size-2 rounded-full",
                            session ? "bg-green-500" : "bg-red-500"
                        )}
                    />
                    <span>
                        {`${session?.slice(29, 39)}...` || "No session"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Page;
