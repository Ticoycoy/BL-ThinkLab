
import { LandingHeader } from '@/components/landing-header';
import { Separator } from '@/components/ui/separator';
import { Database, FilePlus, BrainCircuit, Plug, ShieldCheck, BarChart, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
    const keyFeatures = [
        {
            icon: Database,
            title: "Smart Data Structuring",
            description: "Automatically organize and validate citation-related files, including business listings, NAP (Name, Address, Phone) data, keyword maps, and metadata spreadsheets — ensuring optimal structure for SEO and citation directories."
        },
        {
            icon: FilePlus,
            title: "Custom File Templates for SEO & Local Listings",
            description: "Access a library of research-backed file templates tailored for Google Business Profiles, local citations, directory submissions, and SEO audits, reducing manual work and maintaining formatting consistency."
        },
        {
            icon: BrainCircuit,
            title: "AI-Powered File Analysis",
            description: "Leverage intelligent algorithms to detect inconsistencies, duplicates, and errors across multiple files and platforms — helping teams clean and standardize citation data before submission."
        },
        {
            icon: Plug,
            title: "Seamless Integration",
            description: "Connect with popular platforms (e.g., Google Sheets, CSV, JSON, Airtable, and CRMs) to enable automated syncing, importing, and exporting of citation and SEO data across systems."
        },
        {
            icon: ShieldCheck,
            title: "Secure Cloud-Based File Storage",
            description: "Safely store and access files through a secure cloud environment optimized for SEO workflows, with version control and role-based access for teams."
        },
        {
            icon: BarChart,
            title: "Insight Reports & Audit Tools",
            description: "Generate real-time reports that evaluate the quality and completeness of citation files, flagging issues that may affect local search rankings."
        },
    ];

    const targetAudience = [
        "Digital marketing agencies managing multiple clients' local SEO",
        "Enterprise teams standardizing citation data across locations",
        "Startups building scalable SEO and citation management tools",
        "Researchers & Developers analyzing trends in business listing effectiveness",
    ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section id="services" className="py-20 md:py-24">
            <div className="container max-w-5xl mx-auto">
                <div className="space-y-16">
                    
                    <div className="space-y-4 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Our Services</h1>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                           Advanced File Management Solutions for SEO & Citation Building. Our research-driven service offers cutting-edge file management tools designed specifically for businesses, agencies, and SEO professionals handling large-scale citation data and SEO documents. Built with efficiency, accuracy, and scalability in mind, our solutions are engineered to streamline digital workflows and boost online visibility.
                        </p>
                    </div>
                    
                    <Separator />

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">Key Features</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {keyFeatures.map((feature, index) => (
                                <div key={index} className="flex flex-col gap-4 p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                                    <feature.icon className="h-8 w-8 text-primary" />
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-4 rounded-lg bg-muted/50 p-8 border">
                            <h2 className="text-2xl font-bold">Who It's For</h2>
                            <ul className="space-y-3 pt-2">
                                {targetAudience.map((point, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                                    <span className="text-muted-foreground">{point}</span>
                                </li>
                                ))}
                            </ul>
                        </div>

                         <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Why Choose Us?</h2>
                            <p className="text-muted-foreground">
                                Backed by an expert research team, our file management tools are designed to adapt to the evolving landscape of SEO and citation strategy. Every tool is rigorously tested and updated based on the latest industry standards, search engine algorithm changes, and data integrity practices.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
