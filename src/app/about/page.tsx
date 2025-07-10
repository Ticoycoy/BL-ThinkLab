
import { LandingHeader } from '@/components/landing-header';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section id="about" className="py-20 md:py-24">
            <div className="container max-w-4xl mx-auto">
                <div className="space-y-12">
                    
                    <div className="space-y-4 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About Us</h1>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            At the forefront of digital innovation, our Research and Development Team is dedicated to pioneering advanced technologies in Citation Building and Search Engine Optimization (SEO). We bring together a multidisciplinary team of data scientists, software engineers, digital marketers, and SEO strategists to explore, create, and refine the tools and methodologies that shape the future of digital visibility.
                        </p>
                    </div>
                    
                    <Separator />

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">What We Do</h2>
                            <p className="text-muted-foreground">
                                Our work focuses on solving complex challenges in local and global search optimization by developing intelligent systems that:
                            </p>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>Automate and optimize local citation building to improve map listings and search accuracy.</li>
                                <li>Analyze search algorithms and ranking factors to predict SEO trends.</li>
                                <li>Design scalable platforms that integrate AI-driven insights for real-time optimization strategies.</li>
                                <li>Ensure data consistency and accuracy across citation directories and web ecosystems.</li>
                                <li>Provide actionable, research-backed strategies for businesses and SEO professionals.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Why It Matters</h2>
                            <p className="text-muted-foreground">
                                In today’s competitive digital environment, having accurate and consistent online citations is critical for local SEO success. Meanwhile, understanding the evolving behavior of search engines is essential for any brand seeking to maintain a strong online presence. Our innovations empower businesses to rank higher, reach wider audiences, and build trust in an increasingly algorithm-driven world.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-lg bg-muted/50 p-8 border">
                        <h2 className="text-2xl font-bold">Our Approach</h2>
                        <p className="text-muted-foreground">
                            Driven by a commitment to evidence-based research and technological excellence, we continuously test, evaluate, and improve our tools and models. We collaborate with academic institutions, industry experts, and digital platforms to stay ahead of the curve — ensuring that our work remains impactful and future-ready.
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
