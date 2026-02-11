"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { SchoolSummaryNav } from "@/components/school-summary-components/school-summary-nav";
import { SummaryTable } from "@/components/school-summary-components/summary-table";

import type { SummaryType } from "@/lib/types/school-summary-types";

export default function OrderSummaryPage() {
    const [inputText, setInputText] = useState("");
    const [results, setResults] = useState<SummaryType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = async () => {
        if (!inputText.trim()) {
            setError("Please enter data to calculate");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "/api/calculate/calculate-order-summary",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ data: inputText }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to calculate summary");
            }

            const data = await response.json();
            setResults(data.results);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setResults(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background min-h-screen">
            <SchoolSummaryNav />

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Summary Reporter
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Paste your order data to generate a comprehensive
                        summary report
                    </p>
                </div>

                {/* Input Section */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label
                            htmlFor="order-input"
                            className="text-sm font-medium"
                        >
                            Order Data
                        </label>
                        <Textarea
                            id="order-input"
                            placeholder="Paste your order data here...&#10;&#10;Example format:&#10;Item 1 - Description: 10&#10;Item 2 - Description: 20&#10;..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="min-h-[200px] resize-y font-mono text-sm"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-destructive/10 text-destructive rounded-md p-4 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Calculate Button */}
                    <div className="flex justify-center">
                        <Button
                            onClick={handleCalculate}
                            disabled={isLoading || !inputText.trim()}
                            size="lg"
                            className="w-full px-8 sm:w-auto"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Calculating...
                                </>
                            ) : (
                                "Calculate Summary"
                            )}
                        </Button>
                    </div>
                </div>

                {/* Results Section - Progressive Disclosure */}
                {results && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 mt-12 duration-500">
                        <div className="mb-6 flex items-center">
                            <div className="bg-border h-px flex-1" />
                            <h2 className="px-4 text-lg font-semibold">
                                Results
                            </h2>
                            <div className="bg-border h-px flex-1" />
                        </div>

                        <div className="bg-card overflow-x-auto rounded-lg border shadow-sm">
                            <SummaryTable results={results} />
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!results && !isLoading && inputText.trim() === "" && (
                    <div className="text-muted-foreground mt-12 text-center">
                        <p className="text-sm">
                            Enter your order data above and click "Calculate
                            Summary" to see results
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
