"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function SchoolSummaryNav() {
    const pathname = usePathname();

    const isOrderSummary = pathname.includes("/order-summary");
    const isDoubleOrders = pathname.includes("/double-orders");

    return (
        <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
                {/* Logo/Home Link */}
                <Link
                    href="/protected/main"
                    className="hover:text-primary flex items-center space-x-2 text-lg font-semibold transition-colors"
                >
                    <span>🍣</span>
                    <span>O-Sushi</span>
                </Link>

                {/* Navigation Tabs */}
                <nav className="flex items-center space-x-1 sm:space-x-2">
                    <Link
                        href="/protected/school-summary/order-summary"
                        className={cn(
                            "rounded-md px-3 py-2 text-sm font-medium transition-colors sm:px-4",
                            isOrderSummary
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                    >
                        Summary Reporter
                    </Link>
                    <Link
                        href="/protected/school-summary/double-orders"
                        className={cn(
                            "rounded-md px-3 py-2 text-sm font-medium transition-colors sm:px-4",
                            isDoubleOrders
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                    >
                        CSV Processor
                    </Link>
                </nav>
            </div>
        </header>
    );
}
