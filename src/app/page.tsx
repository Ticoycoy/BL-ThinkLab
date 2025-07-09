
import { LandingHeader } from '@/components/landing-header';
import { LandingPage } from '@/components/landing-page';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <LandingPage />
      </main>
    </div>
  );
}
