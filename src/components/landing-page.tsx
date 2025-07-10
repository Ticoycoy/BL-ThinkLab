
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LandingPage() {
  return (
    <>
      <section id="hero" className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Research Team
          </h1>
          <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground md:text-xl">
            A global leader in advancing digital visibility through innovative research in SEO and citation strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" asChild>
              <Link href="/login">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
            <Image
                src="https://placehold.co/600x450.png"
                alt="Research Team Illustration"
                width={600}
                height={450}
                className="rounded-xl"
                data-ai-hint="research scientist illustration"
            />
        </div>
      </section>
    </>
  );
}
