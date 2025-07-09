
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          Research Team
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Home</Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Services</Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
