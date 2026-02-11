"use client";

import { DragEvent, useRef, useState } from "react";

import { FileText, Loader2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { SchoolSummaryNav } from "@/components/school-summary-components/school-summary-nav";
import { DoublesTable } from "@/components/school-summary-components/summary-table";

import type { DoublesResponse } from "@/lib/types/school-summary-types";

export default function DoubleOrdersPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [results, setResults] = useState<DoublesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type === "text/csv" || file.name.endsWith(".csv")) {
                setSelectedFile(file);
                setError(null);
            } else {
                setError("Please select a valid CSV file");
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === "text/csv" || file.name.endsWith(".csv")) {
                setSelectedFile(file);
                setError(null);
            } else {
                setError("Please select a valid CSV file");
            }
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setResults(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleProcessCSV = async () => {
        if (!selectedFile) {
            setError("Please select a CSV file");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch(
                "/api/calculate/process-double-orders",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to process CSV file");
            }

            const data = await response.json();

            console.log(data as DoublesResponse);

            setResults(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setResults({
                results: [],
                message: "An error occurred",
            } as DoublesResponse);
        } finally {
            setIsLoading(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
        );
    };

    return (
        <div className="bg-background min-h-screen">
            <SchoolSummaryNav />

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        CSV Processor
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Upload your CSV file to identify and process double
                        orders
                    </p>
                </div>

                {/* Upload Section */}
                <div className="space-y-6">
                    <div className="bg-card rounded-lg border p-6 shadow-sm">
                        {/* Drag & Drop Zone */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`rounded-lg border-2 border-dashed transition-colors ${
                                isDragging
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                            } ${selectedFile ? "min-h-30" : "min-h-50"}`}
                        >
                            <div className="flex flex-col items-center justify-center p-6 text-center">
                                {!selectedFile ? (
                                    <>
                                        <Upload className="text-muted-foreground mb-4 h-12 w-12" />
                                        <p className="text-muted-foreground mb-2 text-sm">
                                            Drag and drop your CSV file here, or
                                        </p>
                                        <Button
                                            onClick={handleBrowseClick}
                                            variant="outline"
                                            className="mt-2"
                                        >
                                            Browse Files
                                        </Button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".csv,text/csv"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                    </>
                                ) : (
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 text-primary rounded-lg p-2">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-medium">
                                                    {selectedFile.name}
                                                </p>
                                                <p className="text-muted-foreground text-xs">
                                                    {formatFileSize(
                                                        selectedFile.size
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleRemoveFile}
                                            variant="ghost"
                                            size="sm"
                                            className="hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Hidden File Input */}
                        {!selectedFile && (
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv,text/csv"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-destructive/10 text-destructive mt-4 rounded-md p-4 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Process Button */}
                        {selectedFile && (
                            <div className="mt-6 flex justify-center">
                                <Button
                                    onClick={handleProcessCSV}
                                    disabled={isLoading}
                                    size="lg"
                                    className="w-full px-8 sm:w-auto"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Process CSV
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Section - Progressive Disclosure */}
                {results && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 mt-12 duration-500">
                        <div className="mb-6 flex items-center">
                            <div className="bg-border h-px flex-1" />
                            <h2 className="px-4 text-lg font-semibold">
                                Results
                                {Object.keys(results).length > 0 && (
                                    <span className="text-muted-foreground ml-2 text-sm font-normal">
                                        ({Object.keys(results).length} double{" "}
                                        {Object.keys(results).length === 1
                                            ? "order"
                                            : "orders"}{" "}
                                        found)
                                    </span>
                                )}
                            </h2>
                            <div className="bg-border h-px flex-1" />
                        </div>

                        <div className="bg-card overflow-x-auto rounded-lg border shadow-sm">
                            <DoublesTable data={results} />
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!results && !isLoading && !selectedFile && (
                    <div className="text-muted-foreground mt-12 text-center">
                        <p className="text-sm">
                            Upload a CSV file to begin processing
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
