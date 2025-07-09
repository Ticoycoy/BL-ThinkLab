
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <>
      <section id="hero" className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Welcome to the <span className="text-primary">Brightlocal Research Team</span> Hub
          </h1>
          <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground md:text-xl">
            This is the central hub for our research and task management. Streamline your workflow, collaborate effectively, and drive innovation with powerful tools at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" asChild>
              <Link href="/login">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
            <Image
                src="https://placehold.co/600x400.png"
                alt="Research Team Collaboration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint="research collaboration"
            />
        </div>
      </section>
      
      <section id="about" className="py-20 md:py-32 bg-muted/50">
        <div className="container space-y-12">
            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">An Introduction to the Team</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground md:text-lg">
                    We are a dedicated group of researchers and developers passionate about building the future of local SEO and digital marketing tools. Our mission is to provide data-driven insights and innovative solutions that empower businesses to succeed online. We thrive on innovation, collaboration, and making a tangible impact on our customers' success.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="p-6 bg-card rounded-lg shadow-sm text-center">
                    <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                    <p className="text-muted-foreground">We constantly explore new technologies and methodologies to stay ahead of the curve.</p>
                </div>
                <div className="p-6 bg-card rounded-lg shadow-sm text-center">
                    <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                    <p className="text-muted-foreground">We believe the best ideas come from working together and sharing knowledge.</p>
                </div>
                <div className="p-6 bg-card rounded-lg shadow-sm text-center">
                    <h3 className="text-xl font-semibold mb-2">Impact</h3>
                    <p className="text-muted-foreground">Our work directly contributes to the success of thousands of Brightlocal customers.</p>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
