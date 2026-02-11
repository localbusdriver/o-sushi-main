import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { navLinks } from "@/lib/data/protected-sidebar-data";

const Page = () => {
    return (
        <div className="bg-background min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto">
                {/* Header Section */}
                <header className="mb-6 flex flex-col items-start gap-2 sm:mb-8">
                    <h1 className="text-2xl text-red-300">O&apos;sushi</h1>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                        Dashboard
                    </h1>
                </header>

                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                    {navLinks.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="block min-h-37.5"
                            passHref
                        >
                            <Card className="h-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
                                <CardHeader className="p-4 sm:p-6">
                                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                        <div className="bg-primary/10 text-primary rounded-lg p-3 sm:p-2">
                                            {card.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl sm:text-lg md:text-xl">
                                                {card.title}
                                            </CardTitle>
                                            <CardDescription className="text-sm sm:text-base">
                                                {card.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6">
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        Click to access
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
