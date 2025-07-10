
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
      
      <section id="about" className="py-20 md:py-24 bg-muted/50">
        <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Vision Statement</h2>
                    <p className="text-muted-foreground text-lg">
                        To be a global leader in advancing digital visibility through innovative research in SEO and citation strategies, empowering businesses and institutions to achieve authoritative online presence.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Mission Statement</h2>
                    <p className="text-muted-foreground mb-4">
                        Our mission is to conduct cutting-edge research and develop data-driven solutions in search engine optimization and citation building.
                    </p>
                    <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                        <li>Analyze and predict search algorithm trends for better content strategy.</li>
                        <li>Design scalable citation systems to boost local SEO performance.</li>
                        <li>Provide actionable insights that support ethical, white-hat SEO practices.</li>
                        <li>Collaborate with academic and industry partners to refine and disseminate best practices.</li>
                        <li>Bridge the gap between research and real-world application in digital marketing.</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
