
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';

export function LandingPage() {
  const missionPoints = [
    "Analyze and predict search algorithm trends for better content strategy.",
    "Design scalable citation systems to boost local SEO performance.",
    "Provide actionable insights that support ethical, white-hat SEO practices.",
    "Collaborate with academic and industry partners to refine and disseminate best practices.",
    "Bridge the gap between research and real-world application in digital marketing."
  ];

  return (
    <>
      <section id="hero" className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            BL ThinkLab
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
                alt="BL ThinkLab Illustration"
                width={600}
                height={450}
                className="rounded-xl"
                data-ai-hint="research scientist illustration"
            />
        </div>
      </section>

      <Separator />

      <section id="vision-mission" className="py-20 md:py-24">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight">Our Vision</h2>
                <p className="text-muted-foreground">
                  To be a global leader in advancing digital visibility through innovative research in SEO and citation strategies, empowering businesses and institutions to achieve authoritative online presence.
                </p>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                <p className="text-muted-foreground">
                  Our mission is to conduct cutting-edge research and develop data-driven solutions in search engine optimization and citation building.
                </p>
              </div>
            </div>
            <div className="space-y-4 rounded-lg bg-muted/50 p-8 border">
              <h3 className="text-xl font-semibold">We aim to:</h3>
              <ul className="space-y-3">
                {missionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
