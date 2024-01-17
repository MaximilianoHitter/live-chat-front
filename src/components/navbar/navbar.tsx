"use client"

import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import AuthUser from "@/lib/AuthUser"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

export function NavbarCustom({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) {
    const {getUser } = AuthUser();
    return (
        <NavigationMenu className="mt-2">
            <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <Link to="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </Link>
              <Link to="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </Link>
              <Link to="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </Link>
            </ul>
          </NavigationMenuContent>
            </NavigationMenuItem>
            </NavigationMenuList>
            <Link
          to="/examples/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Overview
        </Link>
        <Link
          to="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Customers
        </Link>
        <Link
          to="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Products
        </Link>
        {getUser() && getUser().perms.includes('documentacion') && <Link
          to="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </Link>}
        </NavigationMenu>

    )
  }
