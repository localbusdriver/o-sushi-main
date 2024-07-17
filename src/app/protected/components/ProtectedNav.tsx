"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const ProtectedNav = () => {
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="fixed top-10 w-screen flex justify-center">
      <NavigationMenu className="border rounded-lg border-primary">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>School Summary</NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col">
              <NavigationMenuLink
                href="/protected/school-summary/doubles"
                className="w-[161px] border border-t-gray-300 text-center py-1"
              >
                Double Orders
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/protected/school-summary/summary"
                className="w-[161px] border border-t-gray-300 text-center py-1"
              >
                Order Summary
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <Button variant="ghost" onClick={handleSignOut}>
            Exit
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default ProtectedNav;
