"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ClipboardCheck } from "lucide-react";

// Data for navigation
const aboutUsComponents: { title: string; href: string }[] = [
  { title: "Team Member's Profiles", href: "#" },
  { title: "Team Rules", href: "#" },
  { title: "Leaves Rules, Processes & Plans", href: "#" },
  { title: "DTRs (PLs, UPLs, Sick Leave, Others)", href: "#" },
];

const teamResponsibilities: { title: string; items: { title: string; href: string }[] }[] = [
  {
    title: "Team Onboarding/Trainings/Refreshers",
    items: [
      { title: "Onboarding Plan", href: "#" },
      { title: "Training Materials", href: "#" },
      { title: "Refresher Schedule", href: "#" },
    ],
  },
  {
    title: "Team Performance Reports",
    items: [
      { title: "Quarterly Reviews", href: "#" },
      { title: "Monthly KPIs", href: "#" },
      { title: "Individual Goals", href: "#" },
      { title: "Annual Summary", href: "#" },
    ],
  },
  {
    title: "Team Meeting Plans and Reports",
    items: [
      { title: "Weekly Stand-up Agenda", href: "#" },
      { title: "Weekly Stand-up Minutes", href: "#" },
      { title: "Monthly All-Hands Agenda", href: "#" },
      { title: "Monthly All-Hands Minutes", href: "#" },
      { title: "Project Kick-off Plans", href: "#" },
      { title: "Retrospective Reports", href: "#" },
    ],
  },
];

const taskReports: { title: string; items: { title: string; href: string }[] }[] = [
    {
        title: "Team Task Reports",
        items: [
            { title: "Daily Task Summary", href: "#" },
            { title: "Weekly Progress", href: "#" },
            { title: "Milestone Achievement", href: "#" },
            { title: "Blockers Report", href: "#" },
            { title: "Completed Tasks", href: "#" },
            { title: "Effort Estimation vs Actual", href: "#" },
        ],
    },
    {
        title: "Team CB Improvements Suggestions",
        items: [
            { title: "Improvement Suggestions", href: "#" },
        ],
    },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
            <ClipboardCheck className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight">WorkFlowZen</span>
        </Link>
    
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    🏠 Home
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuTrigger>👥 About Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[400px]">
                    {aboutUsComponents.map((component) => (
                        <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                        />
                    ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
                <NavigationMenuTrigger>📊 Team Responsibilities</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-3 gap-4 p-4 md:w-[800px]">
                        {teamResponsibilities.map((section) => (
                            <div key={section.title} className="flex flex-col">
                                <h3 className="mb-2 font-semibold text-sm text-foreground px-3">{section.title}</h3>
                                <ul className="flex flex-col gap-1">
                                    {section.items.map((item) => (
                                        <ListItem key={item.title} title={item.title} href={item.href} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuTrigger>📄 Task Reports</NavigationMenuTrigger>
                <NavigationMenuContent>
                     <div className="grid w-[500px] grid-cols-2 gap-4 p-4 md:w-[600px]">
                        {taskReports.map((section) => (
                            <div key={section.title} className="flex flex-col">
                                <h3 className="mb-2 font-semibold text-sm text-foreground px-3">{section.title}</h3>
                                <ul className="flex flex-col gap-1">
                                    {section.items.map((item) => (
                                        <ListItem key={item.title} title={item.title} href={item.href} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <Link href="#" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    ⚙️ Research Environment
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="#" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    📅 Render Services
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

const ListItem = ({ className, title, href }: { className?: string; title: string; href: string }) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href}
            className={cn(
              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  };
